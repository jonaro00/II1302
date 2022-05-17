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
    await expect(dao.register({ username: testname, password: testpass })).rejects.toThrow(
      'Failed to register user.',
    )
  })

  it('should not accept an incorrect password', async () => {
    await dao.register({ username: testname, password: testpass })
    await expect(dao.login({ username: testname, password: '123456' })).rejects.toThrow(
      'Invalid password!',
    )
  })

  it('should not accept an incorrect user', async () => {
    await expect(dao.login({ username: 'obamas last  name', password: 'bruh' })).rejects.toThrow(
      'No user with that name found!',
    )
  })

  it('should add a sensor', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    await expect(
      dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' }),
    ).resolves.toBeUndefined()
  })

  it('should get a sensor with a matching user id', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    await dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' })
    const arr = await dao.getSensors(id)
    expect(arr).toHaveLength(1)
    expect(arr[0].user_id).toEqual(id)
  })

  it('should update a sensor', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    await dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' })
    await dao.updateSensor(id, sensorid, {
      device_azure_name: 'azure name',
      location: 'germany',
    })
    const arr = await dao.getSensors(id)
    expect(arr).toHaveLength(1)
    expect(arr[0].user_id).toEqual(id)
    expect(arr[0].location).toEqual('germany')
  })

  it('should delete a sensor', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    await dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' })
    let arr = await dao.getSensors(id)
    expect(arr).toHaveLength(1)
    await dao.deleteSensor(id, arr[0].id)
    arr = await dao.getSensors(id)
    expect(arr).toHaveLength(0)
  })

  it('should not allow different users to delete sensor', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    const { id: id2 } = await dao.register({ username: 'user2', password: 'password2' })
    await dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' })
    let arr = await dao.getSensors(id)
    expect(arr).toHaveLength(1)
    await expect(dao.deleteSensor(id2, arr[0].id)).rejects.toThrow('Failed to delete sensor.')
  })

  it('should add telemetry with a matching sensor id', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    await dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' })
    await expect(
      dao.addTelemetry(
        'azure name',
        { temp: 5, humidity: 5, lpg: 5, co: 5, smoke: 5 },
        new Date('January 1, 2022 10:00:01'),
      ),
    ).resolves.toBeUndefined()
  })

  it('should get telemetry with a matching sensor id', async () => {
    const { id } = await dao.register({ username: testname, password: testpass })
    await dao.addSensor(id, { device_azure_name: 'azure name', location: 'sweden' })
    const sensor = (await dao.getSensors(id))[0]
    await dao.addTelemetry(
      'azure name',
      { temp: 5, humidity: 5, lpg: 5, co: 5, smoke: 5 },
      new Date('January 1, 2022 10:00:01'),
    )
    const arr = await dao.getTelemetry(
      id,
      sensor.id,
      new Date('January 1, 2022 10:00:00'),
      new Date('January 1, 2023 10:00:00'),
      5,
      100,
    )
    expect(arr).toHaveLength(1)
    expect(arr[0].humidity).toEqual(5)
  })
})
