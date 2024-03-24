const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

const sequelize = new Sequelize( //TODO - nastavení DB login a heslo v .env mimo mikroslužbu
    process.env.DB_NAME, // GymNestUserDB
    process.env.DB_USER, // root
    process.env.DB_PASSWORD, // strongPassword
    {
        host: process.env.DB_HOST, // db-user-management-service
        dialect: 'mysql'
    }
);

module.exports = sequelize;