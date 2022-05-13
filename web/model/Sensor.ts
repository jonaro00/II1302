import { Sequelize, Model, DataTypes } from 'sequelize'
import { TelemetrySeries } from './Telemetry'

export type SensorType = {
  id: number
  device_azure_name: string
  user_id: number
  location: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Sent to backend to create/update a Sensor.
 */
export type SensorUserData = {
  device_azure_name: string
  location: string
}

export type SensorTelemetries = Record<number, TelemetrySeries>

export class Sensor extends Model {
  public static createModel(sequelize: Sequelize): any {
    Sensor.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        device_azure_name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'sensor',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      },
    )
  }
}
