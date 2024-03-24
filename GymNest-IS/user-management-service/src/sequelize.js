const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

const sequelize = new Sequelize( // Nastavení DB login a heslo v .env
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_MYSQL_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;