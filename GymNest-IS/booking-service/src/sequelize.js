const { Sequelize } = require('sequelize');
require('dotenv').config(); // Načtení proměnných z .env souboru

console.log("Database:", process.env.DB_NAME_BS);
console.log("User:", process.env.DB_USER_BS);
console.log("Password:", process.env.DB_PASSWORD_BS);
console.log("Host:", process.env.DB_HOST_BS);
console.log("Port:", process.env.DB_PORT_BS); // Výpis portu pro kontrolu

const sequelize = new Sequelize(
    process.env.DB_NAME_BS, // Jméno databáze
    process.env.DB_USER_BS, // Uživatelské jméno
    process.env.DB_PASSWORD_BS, // Heslo
    {
            host: process.env.DB_HOST_BS, // Hostitel
            port: process.env.DB_PORT_BS, // Port, na kterém běží databáze
            dialect: 'mysql', // Dialekt databáze
            timezone: '+01:00', // Nastavení časové zóny
            logging: console.log, // Povolit logování
            logQueryParameters: true, // Logování parametrů dotazu
    }
);

module.exports = sequelize;
