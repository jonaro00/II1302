import { Observable } from './Observable'
import { fn, Mock } from 'jest-mock'

let ob: Observable
let mock: Mock<any, [p: any]>
let f: any
let g: any
let e: any
beforeEach(() => {
  ob = new Observable()
  mock = fn((p: any) => p)
  f = () => mock('f')
  g = () => mock('g')
  e = () => {
    throw new Error()
  }
})

describe('An Observable', () => {
  it('should call one observer', () => {
    ob.addObserver(mock)
    ob.notifyObservers()
    expect(mock.mock.calls).toHaveLength(1)
    expect(mock.mock.results[0].value).toBeUndefined()
  })

  it('should call several observers in correct order', () => {
    ob.addObserver(f)
    ob.addObserver(g)
    ob.notifyObservers()
    expect(mock.mock.calls).toHaveLength(2)
    expect(mock.mock.results[0].value).toEqual('f')
    expect(mock.mock.results[1].value).toEqual('g')
  })

  it('should call an observer if an other observer is removed', () => {
    ob.addObserver(f)
    ob.addObserver(g)
    ob.removeObserver(g)
    ob.notifyObservers()
    expect(mock.mock.calls).toHaveLength(1)
    expect(mock.mock.results[0].value).toEqual('f')
  })

  it('should not call any observers after all have been removed', () => {
    ob.addObserver(f)
    ob.addObserver(g)
    ob.removeObserver(f)
    ob.removeObserver(g)
    ob.notifyObservers()
    expect(mock.mock.calls).toHaveLength(0)
  })

  it('should call every observer even though one observer throws', () => {
    ob.addObserver(e)
    ob.addObserver(f)
    ob.addObserver(g)
    ob.notifyObservers()
    expect(mock.mock.calls).toHaveLength(2)
  })
})
