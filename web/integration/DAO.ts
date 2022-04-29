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

const allDBModels = [Sensor, User, Telemetry]

export class DAO {
  public database: Sequelize

  constructor() {
    const ns = createNamespace(process.env.DB_NAME || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Sequelize.useCLS(ns)
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
      },
    )
    // initaiate all models
    allDBModels.forEach(model => model.createModel(this.database))
    this.makeTables()
  }

  public static async createDAO(): Promise<DAO> {
    return new DAO()
  }

  private async makeTables(): Promise<void> {
    console.log('Connecting to database...')
    await this.database.authenticate()
    console.log('Making Tables!')
    await this.database.sync({ force: false, alter: false })
  }

  public async login(username: string, password: string): Promise<UserInfo> {
    console.log(`User ${username} attempting login...`)
    const matchingUser = await User.findOne({
      where: { username },
    })
    if (matchingUser === null) throw new Error('No user with that name found!')
    console.log(matchingUser.get('password'))
    if (await User.validPassword(password, matchingUser.get('password') as string)) {
      const { id, name } = matchingUser.get({ plain: true })
      return { id, name }
    } else throw new Error('Invalid password!')
  }

  public async register(username: string, password: string): Promise<UserInfo> {
    console.log(`User ${username} registering...`)
    await User.create({ username, password })
    return this.login(username, password)
  }
}
