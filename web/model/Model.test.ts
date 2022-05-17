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
  it('should notify observers on attribute changes', () => {
    const model = new Model()
    model.addObserver(f)
    model.setUsername(testname)
    expect(mock.mock.calls).toHaveLength(1)
    model.setSensors([])
    expect(mock.mock.calls).toHaveLength(2)
    model.setDeviceTelemetry(1, [])
    expect(mock.mock.calls).toHaveLength(3)
    model.setDeviceEvents(1, [])
    expect(mock.mock.calls).toHaveLength(4)
    model.setDeviceAlarms(1, [])
    expect(mock.mock.calls).toHaveLength(5)
  })
})
