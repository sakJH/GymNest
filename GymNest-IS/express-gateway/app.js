const express = require('express');
const gateway = require('express-gateway');
//const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');

const app = express();
const port = process.env.PORT || 8080;

//Konfigurace CORS
// const corsOptions = {
//     origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:8080'],
//     optionsSuccessStatus: 200,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: ['Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods']
// };

// Swagger dokumentace
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Aktualizuj cestu podle umístění tvých route souborů
};
const swaggerSpec = swaggerJsdoc(options);

// app.use(cors(corsOptions));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// app.get('/api', (req, res) => {
//     res.send('API is running');
// });

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
