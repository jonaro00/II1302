import { Model } from './Model'
import { fn, Mock } from 'jest-mock'
import { UserType } from './User'

let mock: Mock<any, [p: any]>
let f: any

const testname = 'user1',
  testpass = 'password1',
  testuser1: UserType = {
    id: 5,
    username: testname,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

beforeEach(() => {
  mock = fn((p: any) => p)
  f = () => mock('f')
})

describe('The Model', () => {
  // it('should register a user', async ()=>{
  //   const model = new Model()
  //   expect(await model.register({ username: testname, password: testpass})).toBeTruthy()
  //   expect(model.user).toBeTruthy()
  //   expect(model.user?.username).toEqual(testname)
  // })

  it('should notify observers on user change', () => {
    const model = new Model()
    model.addObserver(f)
    model.setUser(testuser1)
    expect(mock.mock.calls).toHaveLength(1)
  })

  // it('should not notify between register and login', async ()=>{
  //   const model = new Model()
  //   model.addObserver(f)
  //   expect(await model.register({ username: testname, password: testpass})).toBeTruthy()
  //   expect(mock.mock.calls).toHaveLength(1)
  //   const logged_in = model.user
  //   expect(await model.signIn({ username: testname, password: testpass}))
  //   expect(mock.mock.calls).toHaveLength(1)
  //   expect(model.user).toBe(logged_in)
  // })
})
