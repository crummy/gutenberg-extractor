const { Sequelize } = require('sequelize');

const storage = process.env.SQLITE_FILE ? process.env.SQLITE_FILE : ":memory:"

const logging = process.env.SQLITE_LOGGING == 'true'

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging
});