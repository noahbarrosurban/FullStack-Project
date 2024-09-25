const Sequelize = require('sequelize');
const database = require('../config/db');
const Marca = require('./marca');
const schema = "";

class Carro extends Sequelize.Model{}

Carro.init(
    {
        CodigoCarro: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Modelo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Ano: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Placa: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize: database, modelName: 'Carro', schema
    }
);

Carro.belongsTo(Marca, {foreignKey: {name: 'MarcaId', allowNull: false}, as : 'Marca'});

module.exports = Carro;