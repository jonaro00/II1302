import { createNamespace } from 'cls-hooked'
import { Sequelize, Dialect } from 'sequelize'
import fs from 'fs'
import { Sensor, SensorType, SensorUserData } from '../model/Sensor'
import { User, UserCredentials, UserType } from '../model/User'
import { IncomingTelemetry, Telemetry } from '../model/Telemetry'
import { Alarm } from '../model/Alarm'
import { AzureSystemEventType, Event } from '../model/Event'

export const allDBModels = [Alarm, Event, Sensor, User, Telemetry]

/**
 * Data Access Object.
 * Uses Singleton pattern: Get the (only) instance with `await DAO.getInstance()`.
 */
export class DAO {
  public database: Sequelize
  private static readonly instance: Promise<DAO> = DAO.createDAO()

  /**
   * Get the Promise for the DAO instance.
   * @returns The Promise for the DAO instance.
   */
  public static async getInstance(): Promise<DAO> {
    return DAO.instance
  }

  private constructor() {
    const ns = createNamespace(process.env.DB_NAME as string)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Sequelize.useCLS(ns)
    this.database = new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USER as string,
      process.env.DB_PASS as string,
      {
        host: process.env.DB_HOST as string,
        port: Number.parseInt(process.env.DB_PORT as string),
        dialect: process.env.DB_DIALECT as Dialect,
        ssl: true,
        dialectOptions: {
          ssl: {
            ca: fs.readFileSync('integration/Azure-db-DigiCertGlobalRootCA.crt.pem'),
          },
        },
        logging: false, // change to true to print all SQL queries when debugging
      },
    )
    // initaiate all models
    allDBModels.forEach(model => model.createModel(this.database))
    DAO.createAssociations()
  }

  private static async createDAO(): Promise<DAO> {
    const dao = new DAO()
    await dao.makeTables()
    return dao
  }

  private async makeTables(): Promise<void> {
    await this.database.authenticate()
    await this.database.sync({ force: false, alter: false })
  }

  private static createAssociations(): void {
    // User 1 <---> 0..* Sensor
    User.hasMany(Sensor)
    Sensor.belongsTo(User)

    // Sensor 1 <---> 0..* Event
    Sensor.hasMany(Event)
    Event.belongsTo(Sensor)

    // Sensor 1 <---> 0..* Telemetry
    Sensor.hasMany(Telemetry)
    Telemetry.belongsTo(Sensor)

    // Sensor 1 <---> 0..* Alarm
    Sensor.hasMany(Alarm)
    Alarm.belongsTo(Sensor)
  }

  public async login({ username, password }: UserCredentials): Promise<UserType> {
    return await this.database.transaction(async t => {
      // use t.afterCommit ??
      const matchingUser = await User.findOne({
        where: { username },
      })
      if (matchingUser === null) throw new Error('No user with that name found!')
      if (await User.validPassword(password, matchingUser.get('password') as string)) {
        const { id, username, createdAt, updatedAt } = matchingUser.get({ plain: true })
        return { id, username, createdAt, updatedAt }
      } else throw new Error('Invalid password!')
    })
  }

  public async register({ username, password }: UserCredentials): Promise<UserType> {
    // TODO: Verify username and password validity
    try {
      await this.database.transaction(async t => {
        await User.create({ username, password })
      })
      return this.login({ username, password })
    } catch (error) {
      throw new Error('Failed to register user.')
    }
  }

  public async getUserId({ username, password }: UserCredentials): Promise<number> {
    const { id } = await this.login({ username, password })
    return id
  }

  public async getSensors(user_id: number): Promise<SensorType[]> {
    return await this.database.transaction(async t => {
      const userSensors = await Sensor.findAll({
        where: { user_id },
      })
      return userSensors.map(s => s.get({ plain: true }))
    })
  }

  public async addSensor(
    user_id: number,
    { device_azure_name, location }: SensorUserData,
  ): Promise<void> {
    try {
      await this.database.transaction(async t => {
        await Sensor.create({ user_id, device_azure_name, location })
      })
    } catch (error) {
      throw new Error('Failed to add sensor.')
    }
  }

  public async updateSensor(
    user_id: number,
    sensor_id: number,
    sensor_data: SensorUserData,
  ): Promise<void> {
    try {
      await this.database.transaction(async t => {
        const [affectedRows] = await Sensor.update(sensor_data, {
          where: { id: sensor_id, user_id },
        })
        if (affectedRows !== 1) throw new Error('Query did not match exactly one row.')
      })
    } catch (error) {
      throw new Error('Failed to update sensor.')
    }
  }

  public async deleteSensor(user_id: number, sensor_id: number): Promise<void> {
    try {
      await this.database.transaction(async t => {
        const sensor = await Sensor.findOne({ where: { id: sensor_id, user_id } })
        if (sensor === null) throw new Error('Sensor not found.')
        await sensor.destroy()
      })
    } catch (error) {
      throw new Error('Failed to delete sensor.')
    }
  }

  public async addTelemetry(
    device_azure_name: string,
    { temp, humidity, lpg, co, smoke }: IncomingTelemetry,
  ): Promise<void> {
    try {
      await this.database.transaction(async t => {
        const sensor = await Sensor.findOne({ where: { device_azure_name } })
        if (sensor === null) throw new Error('No sensor with that name found.')
        const sensor_id = sensor.get('sensor_id')
        await Telemetry.create({ sensor_id, temp, humidity, lpg, co, smoke })
      })
    } catch (error) {
      throw new Error('Failed to add telemetry.')
    }
  }

  public async addEvent(device_azure_name: string, type: AzureSystemEventType): Promise<void> {
    try {
      await this.database.transaction(async t => {
        const sensor = await Sensor.findOne({ where: { device_azure_name } })
        if (sensor === null) throw new Error('No sensor with that name found.')
        const sensor_id = sensor.get('sensor_id')
        await Event.create({ sensor_id, type })
      })
    } catch (error) {
      throw new Error('Failed to add telemetry.')
    }
  }
}
