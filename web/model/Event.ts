import { Sequelize, Model, DataTypes } from 'sequelize'

export type EventType = {
  sensor_id: number
  type: string
  createdAt: Date
}

export type AzureSystemEventType =
  | 'DeviceCreated'
  | 'DeviceDeleted'
  | 'DeviceConnected'
  | 'DeviceDisconnected'

export class Event extends Model {
  public static createModel(sequelize: Sequelize): any {
    Event.init(
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
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'event',
        paranoid: false,
        freezeTableName: true,
        timestamps: true,
        updatedAt: false,
      },
    )
  }
}
