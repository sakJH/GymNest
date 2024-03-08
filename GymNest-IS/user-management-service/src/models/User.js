const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Cesta k souboru sequelize !!! TODO

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    // Sequelize automaticky vytvoří foreign key pro Role
}, {
    // další nastavení
});

module.exports = User;
