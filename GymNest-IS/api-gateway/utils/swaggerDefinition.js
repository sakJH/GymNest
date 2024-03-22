// swaggerDefinition.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express Gateway API',
        version: '1.0.0',
        description: 'Popis mého API',
        contact: {
            name: 'Jan Sakač',
            email: 'sakacja1@uhk.cz'
        },
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'API Gateway server'
        }
    ],
};

module.exports = swaggerDefinition;
