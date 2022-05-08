import { Model } from './Model'
import { fn, Mock } from 'jest-mock'

let mock: Mock<any, [p: any]>
let f: any

const testname = 'user1'

beforeEach(() => {
  mock = fn((p: any) => p)
  f = () => mock('f')
})

describe('The Model', () => {
  it('should notify observers on user change', () => {
    const model = new Model()
    model.addObserver(f)
    model.setUsername(testname)
    expect(mock.mock.calls).toHaveLength(1)
  })
})
