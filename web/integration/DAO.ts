import { createNamespace } from 'cls-hooked'
import { Sequelize, Dialect } from 'sequelize'
import * as fs from 'fs'
import { Sensor } from '../model/Sensor'
import { User } from '../model/User'
import { Telemetry } from '../model/Telemetry'

export type UserInfo = {
  id: string
  name: string
}

export const allDBModels = [Sensor, User, Telemetry]

export class DAO {
  public database: Sequelize

  constructor(test: boolean) {
    const ns = createNamespace(process.env.DB_NAME || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Sequelize.useCLS(ns)
    if (test) {
      this.database = new Sequelize('sqlite::memory:', { logging: false })
    } else {
      this.database = new Sequelize(
        process.env.DB_NAME || '',
        process.env.DB_USER || '',
        process.env.DB_PASS || '',
        {
          host: process.env.DB_HOST || '',
          port: Number.parseInt(process.env.DB_PORT || ''),
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
    }
    // initaiate all models
    allDBModels.forEach(model => model.createModel(this.database))
  }

  public static async createDAO(test: boolean): Promise<DAO> {
    const dao = new DAO(test)
    await dao.makeTables()
    return dao
  }

  private async makeTables(): Promise<void> {
    await this.database.authenticate()
    await this.database.sync({ force: false, alter: false })
  }

  public async login(username: string, password: string): Promise<UserInfo> {
    const matchingUser = await User.findOne({
      where: { name: username },
    })
    if (matchingUser === null) throw new Error('No user with that name found!')
    if (await User.validPassword(password, matchingUser.get('password') as string)) {
      const { id, name } = matchingUser.get({ plain: true })
      return { id, name }
    } else throw new Error('Invalid password!')
  }

  public async register(username: string, password: string): Promise<UserInfo> {
    try {
      await User.create({ name: username, password })
    } catch (error) {
      throw new Error('Failed to register user.')
    }
    return this.login(username, password)
  }
}
