import { Sequelize, Model, DataTypes } from 'sequelize'

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
                paranoid: true
                //indexes: [],
            }
        )
    }
}