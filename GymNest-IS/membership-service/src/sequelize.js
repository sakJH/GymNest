const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

console.log("Database:", process.env.DB_NAME_MS);
console.log("User:", process.env.DB_USER_MS);
console.log("Password:", process.env.DB_PASSWORD_MS);
console.log("Host:", process.env.DB_HOST_MS);
console.log("Port:", process.env.DB_PORT_MS); // Výpis portu pro kontrolu

const sequelize = new Sequelize(
    process.env.DB_NAME_MS, // Jméno databáze
    process.env.DB_USER_MS, // Uživatelské jméno
    process.env.DB_PASSWORD_MS, // Heslo
    {
            host: process.env.DB_HOST_MS, // Hostitel
            port: process.env.DB_PORT_MS, // Port, na kterém běží databáze
            dialect: 'mysql', // Dialekt databáze
            timezone: '+01:00', // Nastavení časové zóny
            logging: console.log, // Povolit logování
            logQueryParameters: true, // Logování parametrů dotazu
    }
);

module.exports = sequelize;
