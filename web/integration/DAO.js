const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Person = require('../model/Person').Person;
const Availability = require('../model/Availability').Availability;
const Competence = require('../model/Competence').Competence;
const Competence_profile = require('../model/Competence_profile').Competence_profile;

class DAO {
  constructor() {
    const ns = cls.createNamespace(process.env.DB_NAME);
    Sequelize.useCLS(ns);
    this.database = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST, dialect: process.env.DB_DIALECT
      }
    );
    Person.createModel(this.database);
    this.transactions = getTransactions();
    makeTables();
    console.log("Contructing DAO")
  }

  getTransactions() {
    try {
      return this.database;
    } catch (error) {
      throw error
    }
  }

  static async createDAO() {
    try {
      const conDAO = new DAO();
      return conDAO;
    } catch (error) {
      throw error
    }
  }

  async makeTables() {
    try {
      await this.database.authenticate();
      await this.database.sync({ force: false });
      console.log("Making Tables!");
    } catch (error) {
      throw error
    }
  }

  async login(username, password) {
    console.log("Logging in!");
    try {
      var matchingPersons = await Person.findAll({
        where: { username: username }
      });
      var check = false;
      var matchingPerson;
      for (let i = 0; i < Object.keys(matchingPersons).length; i++) {
        console.log(matchingPersons[i].get('password'));
        if (Person.validPassword(password, matchingPersons[i].get('password'))) {
          matchingPerson = matchingPersons[i].get({ plain: true });
          check = true;
        }
      }
      if (check) {
        console.log("valid");
      }
      else {
        console.log("invalid");
        matchingPersons = [];
      }
      return this.transactions.transaction(async (x) => {
        var matchingPerson = await this.recruitDAO.login(username, password);
        console.log(Object.keys(matchingPerson).length)
        if (Object.keys(matchingPerson).length >= 1) {
          console.log(true);
          return true
        } else {
          console.log(false)
          return false;
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async register(user) {
    try {
      await Person.create(
        { name: user.name, surname: user.surname, email: user.email, pnr: user.pnr, username: user.username, password: user.password, role_id: user.role_id }
      );
      var persons = await Person.findAll({
        where: { name: user.name, surname: user.surname, email: user.email, pnr: user.pnr, username: user.username, role_id: user.role_id }
      });
      return this.transactions.transaction(async (x) => {
        var isCreated = persons;
        console.log(isCreated)
        console.log(Object.keys(isCreated).length)
        if (Object.keys(isCreated).length >= 1) {
          return true
        } else {
          return false;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = { DAO: DAO, login: DAO.login, makeTables: DAO.makeTables, createDAO: DAO.createDAO, register: DAO.register, getTransactions: DAO.getTransactions};