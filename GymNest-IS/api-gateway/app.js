const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

const app = express();
const port = process.env.PORT || 8080;

// Konfigurace CORS
const corsOptions = {
    origin: '*', // Povolit requesty ze všech originů
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Povolit tyto HTTP metody
    allowedHeaders: 'Content-Type,Authorization', // Povolit tyto hlavičky
};

// Middleware
app.use(cors(corsOptions)); // Aplikace CORS middleware s nastavením
app.use(express.json()); // Pro zpracování JSON requestů

// Swagger dokumentace
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'], // cesta k souborům s dokumentací pro Swagger
};
const swaggerSpec = swaggerJsdoc(options);

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Základní route
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
