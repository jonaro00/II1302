import { DAO, allDBModels } from './DAO'
import { describe, expect, test, beforeEach, afterEach } from '@jest/globals'

let dao: DAO
beforeEach(async () => {
  dao = await DAO.getInstance()
})
afterEach(async () => {
  await dao.database.close()
})

test('Register a user and log in', async () => {
  expect(Object.keys(dao.database.models)).toHaveLength(allDBModels.length)
  const testname = 'user1',
    testpass = 'password1'
  const { id, name } = await dao.register(testname, testpass)
  expect(id).not.toBeNull()
  expect(name).toEqual(testname)
  expect(dao.register(testname, testpass)).rejects.toThrow('Failed to register user.')
  expect(dao.login(testname, '1234')).rejects.toThrow('Invalid password!')
  expect(dao.login('admin', testpass)).rejects.toThrow('No user with that name found!')
})
