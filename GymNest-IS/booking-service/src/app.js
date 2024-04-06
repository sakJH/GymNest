const express = require('express');
const sequelize = require('./sequelize');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');

const activityRoutes = require('./routes/activityRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

//Konfigurace CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:8080'],
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods']
};

// Vytvoření instance Express aplikace
const app = express();
app.use(cors(corsOptions));
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

// Middleware pro parsování JSON těl požadavků
app.use(express.json());
app.use(cors(corsOptions));

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
