import { DAO, allDBModels } from './DAO'
import { describe, expect, test, beforeEach, afterEach } from '@jest/globals'

let dao: DAO
beforeEach(async () => {
  dao = await DAO.createDAO(true)
})
afterEach(async () => {
  await dao.database.close()
})

test('Set up DB models', async () => {
  expect(Object.keys(dao.database.models)).toHaveLength(allDBModels.length)
})

test('Register a user', async () => {
  const testname = 'user1',
    testpass = 'password1'
  const { id, name } = await dao.register(testname, testpass)
  expect(id).not.toBeNull()
  expect(name).toEqual(testname)
})

test('Register a user twice', async () => {
  const testname = 'user1',
    testpass = 'password1'
  await dao.register(testname, testpass)
  expect(dao.register(testname, testpass)).rejects.toThrow()
})

test('Login with incorrect password', async () => {
  const testname = 'user1',
    testpass = 'password1'
  await dao.register(testname, testpass)
  expect(dao.login(testname, '1234')).rejects.toThrow()
})
