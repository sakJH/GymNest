const express = require('express');
const sequelize = require('./sequelize');
const bookingRoutes = require('./routes/bookingRoutes');

const activityRoutes = require('./routes/activityRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

// Vytvoření instance Express aplikace
const app = express();

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

// Middleware pro parsování JSON těl požadavků
app.use(express.json());


// Nastavení rout pro správu rezervací
app.use('/api', bookingRoutes);

app.use('/api', activityRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', notificationRoutes);

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Nastavení portu, na kterém bude aplikace naslouchat
const PORT = process.env.PORT || 3003;

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}.`);
});

module.exports = app;

sequelize.sync({ force: false }).then(() => {
    console.log('Databáze a tabulky byly synchronizovány');
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));
