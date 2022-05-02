import { Sequelize, Model, DataTypes } from 'sequelize'

export type SensorType = {
  id: number
  device_id: string
  user_id: number
  location: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Sent to backend to create/update a Sensor.
 */
export type SensorUserData = {
  device_id: string
  location: string
}

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
        device_id: {
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
        //indexes: [],
      },
    )
  }
}
