import { Sequelize, Model, DataTypes } from 'sequelize'

export type TelemetryType = {
  sensor_id: number
  temp: number
  humidity: number
  lpg: number
  co: number
  smoke: number
  createdAt: Date
}

// {"temp":24,"humidity":60,"lpg":3,"co":17,"smoke":3}
export type IncomingTelemetry = {
  temp: number // ℃
  humidity: number // %
  lpg: number // ppm
  co: number // ppm
  smoke: number // ppm
}

export type TelemetrySeries = {
  times: string[]
  temps: number[]
  humidities: number[]
  lpgs: number[]
  cos: number[]
  smokes: number[]
}

export class Telemetry extends Model {
  public static createModel(sequelize: Sequelize): any {
    Telemetry.init(
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
        temp: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        humidity: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        lpg: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        co: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        smoke: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'telemetry',
        paranoid: true,
        freezeTableName: true,
        timestamps: true,
        updatedAt: false,
        //indexes: [], // perhaps make an index to optimize data lookup
      },
    )
  }
}
