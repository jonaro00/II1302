import { Sequelize, Model, DataTypes } from 'sequelize'
import { User } from './User'

export class Sensor extends Model {
    public static createModel(sequelize: Sequelize): any {
        Sensor.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                deviceId: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                owner: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: User,
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
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                //indexes: [],
            }
        )
    }
}