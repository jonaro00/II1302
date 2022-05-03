import { Sequelize, Model, DataTypes } from 'sequelize'

export type AlarmType = {
  id: number
  sensor_id: number
  value: number
  email: string
  message: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Sent to backend to create/update an Alarm.
 */
export type AlarmUserData = {
  sensor_id: number
  value: number
  email: string
  message: string
}

export class Alarm extends Model {
  public static createModel(sequelize: Sequelize): any {
    Alarm.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        sensor_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'sensor',
            key: 'id',
          },
          allowNull: false,
        },
        value: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'alarm',
        paranoid: true,
        freezeTableName: true,
        timestamps: true,
      },
    )
  }
}
