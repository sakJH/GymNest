const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('GymNestUserDB', 'user', 'password', { //TODO - dodělat dle DB a kódu
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;


const { sequelize } = require('./models');


