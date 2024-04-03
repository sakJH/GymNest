const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');


const app = express();
const port = process.env.PORT || 8080;

// Konfigurace CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:8080 '], // Povolit requesty pouze z tohoto originu
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Povolit tyto HTTP metody
    allowedHeaders: 'Content-Type,Authorization', // Povolit tyto hlavičky
};

// Middleware
app.use(cors(corsOptions)); // Aplikace CORS middleware s nastavením
app.use(express.json()); // Pro zpracování JSON requestů

// Základní route
app.get('/api', (req, res) => {
    res.send('API Gateway is running');
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
