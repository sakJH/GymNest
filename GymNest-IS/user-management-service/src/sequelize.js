const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

const sequelize = new Sequelize.Sequelize(
    process.env.DB_NAME, // GymNestUserDB
    process.env.DB_USER, // adminGymNestUserService
    process.env.DB_PASSWORD, // GymRootNestPaSSword456987
    {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: 'mysql',
        timezone: '+01:00',
        logging: true,
        logQueryParameters: true
    }

); module.exports = sequelize;