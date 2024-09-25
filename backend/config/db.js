const Sequelize = require('sequelize');

const database = new Sequelize('React', 'teste', 'teste', {
    dialect: 'mssql', host: 'localhost', port: 49928
});

database.sync();

module.exports = database;