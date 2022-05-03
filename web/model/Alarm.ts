import { Sequelize, Model, DataTypes } from 'sequelize'

export type AlarmType = {
  sensor_id: number
  value: number
  email: string
  message: string
  createdAt: Date
  updatedAt: Date
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
          allowNull: true,
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
