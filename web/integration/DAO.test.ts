import { DAO, allDBModels } from './DAO'

let dao: DAO
const testname = 'user1',
  testpass = 'password1',
  testid = 1,
  sensorid = 1
beforeAll(async () => {
  dao = await DAO.getInstance()
})
beforeEach(async () => {
  await dao.database.sync({ force: true })
}, 8000)
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

  it('should get a sensor with a matching user id', async () => {
    const arr = await dao.getSensors(testid)
    var check = false
    for (const x of arr) {
      if (x.user_id === testid) {
        check = true
      }
    }
    expect(arr).not.toBeNull()
    expect(check).toEqual(true)
  })

  it('should add a sensor', async () => {
    await dao.addSensor(testid, { device_azure_name: 'azure name', location: 'sweden' })
    const arr = await dao.getSensors(testid)
    var check = false
    for (const x of arr) {
      if (x.user_id === testid) {
        check = true
      }
    }
    expect(arr).not.toBeNull()
    expect(check).toEqual(true)
  })

  it('should update a sensor', async () => {
    await dao.addSensor(testid, { device_azure_name: 'azure name', location: 'sweden' })
    await dao.updateSensor(testid, sensorid, {
      device_azure_name: 'azure name',
      location: 'germany',
    })
    const arr = await dao.getSensors(testid)
    var check = false
    for (const x of arr) {
      if (x.location === 'germany') {
        check = true
      }
    }
    expect(arr).not.toBeNull()
    expect(check).toEqual(true)
  })

  it('should delete a sensor', async () => {
    await dao.addSensor(testid, { device_azure_name: 'azure name', location: 'sweden' })
    await dao.deleteSensor(testid, sensorid)
    const arr = await dao.getSensors(testid)
    expect(arr).toBeNull()
  })

  it('should get telemetry with a matching sensor id', async () => {
    const arr = await dao.getTelemetry(
      testid,
      sensorid,
      new Date('January 1, 2022 10:00:00'),
      new Date('January 1, 2023 10:00:00'),
      5,
      100,
    )
    var check = false
    for (const x of arr) {
      if (x.sensor_id === sensorid) {
        check = true
      }
    }
    expect(arr).not.toBeNull()
    expect(check).toEqual(true)
  })

  it('should add telemetry with a matching sensor id', async () => {
    await dao.addTelemetry(
      'azure name',
      { temp: 5, humidity: 5, lpg: 5, co: 5, smoke: 5 },
      new Date('January 1, 2022 10:00:01'),
    )
    const arr = await dao.getTelemetry(
      testid,
      sensorid,
      new Date('January 1, 2022 10:00:00'),
      new Date('January 1, 2023 10:00:00'),
      5,
      100,
    )
    var check = false
    for (const x of arr) {
      if (x.co === 5) {
        check = true
      }
    }
    expect(arr).not.toBeNull()
    expect(check).toEqual(true)
  })
})
