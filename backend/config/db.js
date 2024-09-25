const Sequelize = require('sequelize');

const database = new Sequelize('React', 'teste', 'teste', {
    dialect: 'mysql', host: 'localhost', port: 30000
});

database.sync();

module.exports = database;