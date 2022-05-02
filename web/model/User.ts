import { Sequelize, Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

export type UserType = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Sent from frontend to backend for sign up and sign in
 */
export type UserCredentials = {
  username: string
  password: string // plaintext or hashed?
}

export class User extends Model {
  public static createModel(sequelize: Sequelize): any {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value: string): void {
            const hash = bcrypt.hashSync(value, 10)
            this.setDataValue('password', hash)
          },
        },
      },
      {
        sequelize,
        modelName: 'user',
        paranoid: true,
        freezeTableName: true,
        timestamps: true,
      },
    )
  }
  public static async validPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
