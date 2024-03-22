const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

const app = express();
const port = process.env.PORT || 8080;

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Zde můžete přidat vlastní middleware nebo konfiguraci
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});