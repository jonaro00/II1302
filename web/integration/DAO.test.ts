import { DAO, allDBModels } from './DAO'

let dao: DAO
const testname = 'user1',
  testpass = 'password1'
beforeAll(async () => {
  dao = await DAO.getInstance()
})
beforeEach(async () => {
  await dao.database.sync({ force: true })
})
afterAll(async () => {
  await dao.database.close()
})

describe('The DAO', () => {
  it('should set up the correct amount of models', async () => {
    expect(Object.keys(dao.database.models)).toHaveLength(allDBModels.length)
  })

  it('should register a user and return its id and username', async () => {
    const { id, username } = await dao.register({ username: testname, password: testpass })
    expect(id).not.toBeNull()
    expect(username).toEqual(testname)
  })

  it('should not let a user register twice', async () => {
    await dao.register({ username: testname, password: testpass })
    expect(dao.register({ username: testname, password: testpass })).rejects.toThrow(
      'Failed to register user.',
    )
  })

  it('should not accept an incorrect password', async () => {
    await dao.register({ username: testname, password: testpass })
    expect(dao.login({ username: testname, password: '123456' })).rejects.toThrow(
      'Invalid password!',
    )
  })

  it('should not accept an incorrect user', async () => {
    expect(dao.login({ username: 'obamas last  name', password: 'bruh' })).rejects.toThrow(
      'No user with that name found!',
    )
  })
})
