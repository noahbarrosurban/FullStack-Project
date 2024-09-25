const Sequelize = require('sequelize');
const database = require('../config/db');
const schema = "";

class Marca extends Sequelize.Model{}

Marca.init(
    {
        CodigoMarca: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Nome: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize: database, modelName: 'Marca', schema
    }
)

module.exports = Marca;