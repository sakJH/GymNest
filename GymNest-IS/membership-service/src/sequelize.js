const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

const sequelize = new Sequelize(
    process.env.DB_NAME, // GymNestUserDB
    process.env.DB_MYSQL_USER,
    process.env.DB_MYSQL_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;