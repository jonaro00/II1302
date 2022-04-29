import { Sequelize, Model, DataTypes } from 'sequelize'
const bcrypt = require('bcrypt')

export class User extends Model {
    public static createModel(sequelize: Sequelize): any {

    }

    public static async validPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}