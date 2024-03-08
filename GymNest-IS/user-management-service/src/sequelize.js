const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gymnest', 'user', 'password', { //TODO
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;


const { sequelize } = require('./models');

// Vaše další nastavení a middleware

