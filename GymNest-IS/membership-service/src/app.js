const express = require('express');
const sequelize = require('./sequelize');
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
const swaggerSpec = swaggerJsdoc(options);

const app = express();

app.use(express.json()); // Middleware pro parsování JSON těl požadavků

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
