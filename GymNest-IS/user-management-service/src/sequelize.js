const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

console.log("Database:", process.env.DB_NAME_US);
console.log("User:", process.env.DB_USER_US);
console.log("Password:", process.env.DB_PASSWORD_US);
console.log("Host:", process.env.DB_HOST_US);
console.log("Port:", process.env.DB_PORT_US); // Výpis portu pro kontrolu

const sequelize = new Sequelize(
    process.env.DB_NAME_US, // Jméno databáze
    process.env.DB_USER_US, // Uživatelské jméno
    process.env.DB_PASSWORD_US, // Heslo
    {
            host: process.env.DB_HOST_US, // Hostitel
            port: process.env.DB_PORT_US, // Port, na kterém běží databáze
            dialect: 'mysql', // Dialekt databáze
            timezone: '+01:00', // Nastavení časové zóny
            logging: console.log, // Povolit logování
            logQueryParameters: true, // Logování parametrů dotazu
    }
);

module.exports = sequelize;
