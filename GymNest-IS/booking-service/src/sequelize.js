const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+01:00',
        logging: true,
        logQueryParameters: true
    }
);

module.exports = sequelize;