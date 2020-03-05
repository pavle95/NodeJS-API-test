const Sequelize = require('sequelize');

const connectionString = process.env.TEST_DATABASE_URL;

module.exports = new Sequelize(connectionString);