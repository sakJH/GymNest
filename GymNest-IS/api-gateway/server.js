const express = require('express');
const gateway = require('express-gateway');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');
const morgan = require('morgan');
require('dotenv').config();


//Konfigurace CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005', 'http://172.22.0.3:3005'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    exposedHeaders: ['*'],
};

const server = express();
const port_api = process.env.PORT_API || 8080;
server.use(morgan('dev'));
server.use(cors());

// Swagger dokumentace
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Aktualizuj cestu podle umístění tvých route souborů
};
const swaggerSpec = swaggerJsdoc(options);


server.use(express.json());
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

server.get('/api', (req, res) => {
    res.send('API is running');
});

server.listen(port_api, () => {
    console.log(`Server poslouchá na adrese http://localhost:${port_api}`);
});
