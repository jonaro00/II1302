import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useState } from 'react'
import usePromise from './usePromise'

const myMessage = 'Cake'
const getResolvingPromise = (ms: number = 0) =>
  new Promise((res, _) => setTimeout(() => res(myMessage), ms))
const getRejectingPromise = (ms: number = 0) =>
  new Promise((_, rej) => setTimeout(() => rej(new Error('Something went wrong')), ms))
const getStallingPromise = () => new Promise(() => {})
function Component({}) {
  const [delay, setDelay] = useState(0)
  const [promise, setPromise] = useState<Promise<any> | null>(null)
  const [result, error] = usePromise(promise)
  return (
    <div>
      <input
        type="number"
        value={0}
        placeholder="delay"
        onChange={e => setDelay(parseInt(e.target.value))}></input>
      <button onClick={() => setPromise(getResolvingPromise(delay))}>Get data</button>
      <button onClick={() => setPromise(getRejectingPromise(delay))}>Get error</button>
      <button onClick={() => setPromise(getStallingPromise())}>Get loading</button>
      <button onClick={() => setPromise(null)}>Reset</button>
      <div role="treeitem">
        {!promise ? 'No data' : error ? `Error: ${error.message}` : result ? result : 'Loading...'}
      </div>
    </div>
  )
}

describe('A component using usePromise', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByRole('treeitem')).toHaveTextContent('No data')
  })

  it('should enter a loading state', () => {
    render(<Component />)
    fireEvent.click(screen.getByText('Get loading'))
    expect(screen.getByRole('treeitem')).toHaveTextContent('Loading...')
  })

  it('should resolve and show data', async () => {
    render(<Component />)
    fireEvent.click(screen.getByText('Get data'))
    await screen.findByText(/Cake/)
  })

  it('should resolve after a delay', async () => {
    render(<Component />)
    fireEvent.change(screen.getByPlaceholderText('delay'), { target: { value: '100' } })
    fireEvent.click(screen.getByText('Get data'))
    await screen.findByText(/Cake/)
  })

  it('should cancel another (error) promise', async () => {
    render(<Component />)
    fireEvent.change(screen.getByPlaceholderText('delay'), { target: { value: '100' } })
    fireEvent.click(screen.getByText('Get error'))
    fireEvent.change(screen.getByPlaceholderText('delay'), { target: { value: '200' } })
    fireEvent.click(screen.getByText('Get data'))
    const promises = await Promise.allSettled([
      screen.findByText(/Error/),
      screen.findByText(/Cake/),
    ])
    expect(promises[0].status).toEqual('rejected')
    expect(promises[1].status).toEqual('fulfilled')
    expect((promises[1] as any).value).toHaveTextContent('Cake')
  })

  it('should cancel another (data) promise', async () => {
    render(<Component />)
    fireEvent.change(screen.getByPlaceholderText('delay'), { target: { value: '100' } })
    fireEvent.click(screen.getByText('Get data'))
    fireEvent.change(screen.getByPlaceholderText('delay'), { target: { value: '200' } })
    fireEvent.click(screen.getByText('Get error'))
    const promises = await Promise.allSettled([
      screen.findByText(/Cake/),
      screen.findByText(/Error/),
    ])
    expect(promises[0].status).toEqual('rejected')
    expect(promises[1].status).toEqual('fulfilled')
    expect((promises[1] as any).value).toHaveTextContent('Error')
  })

  it('should reset data when promise is cleared', async () => {
    render(<Component />)
    fireEvent.click(screen.getByText('Get loading'))
    fireEvent.click(screen.getByText('Reset'))
    screen.findByText(/Loading/)
  })
})
