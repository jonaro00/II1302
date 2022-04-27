const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
class Person extends Sequelize.Model {
  static createModel(sequelize) {
    Person.init(
      {
        person_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
          set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
          }
        },
      },
      { sequelize, modelName: 'person', paranoid: true, freezeTableName: true, timestamps: false },
    );
    Person.validPassword = (password, hash) => {
      return bcrypt.compareSync(password, hash);
    }
    return Person;
  }
}
module.exports = { Person: Person, createModel: Person.createModel };