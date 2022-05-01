import { Sequelize, Model, DataTypes } from 'sequelize'

export type TelemetryType = {
  sensor_id: number
  temp: number
  humidity: number
  gases: number
  // lpg: number // Liquefied Petroleum Gas (Gasol)
  // smoke: number
  // alcohol: number
  // propane: number
  // hydrogen: number
  // methane: number
  // carbon_monoxide: number
  createdAt: Date
}

export class Telemetry extends Model {
  public static createModel(sequelize: Sequelize): any {
    Telemetry.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
        },
        sensor_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'sensor',
            key: 'id',
          },
          allowNull: false,
        },
        temp: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        humidity: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        gases: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        //   lpg: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
        //   smoke: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
        //   alcohol: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
        //   propane: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
        //   hydrogen: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
        //   methane: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
        //   carbon_monoxide: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true
        //   },
      },
      {
        sequelize,
        modelName: 'telemetry',
        paranoid: true,
        freezeTableName: true,
        timestamps: true,
        updatedAt: false,
      },
    )
  }
}
