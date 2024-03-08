const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

const sequelize = new Sequelize( //TODO - nastavení DB login a heslo v db-setup.env mimo mikroslužbu
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;