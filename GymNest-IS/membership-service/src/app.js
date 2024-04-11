const express = require('express');
const sequelize = require('./sequelize');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

const membershipRoutes = require('./routes/membershipRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

//Konfigurace CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005'],
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods']
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();

app.use(express.json()); // Middleware pro parsování JSON těl požadavků
app.use(cors(corsOptions));

// Použití rout pro členství
app.use('/api', membershipRoutes);

// Použití rout pro předplatná
app.use('/api', subscriptionRoutes);

// Použití rout pro platby
app.use('/api', paymentRoutes);

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});

sequelize.sync({ force: false }).then(() => {
    console.log('Databáze a tabulky byly synchronizovány');
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));