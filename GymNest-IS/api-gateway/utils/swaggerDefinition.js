// swaggerDefinition.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express Gateway API',
        version: '1.0.0',
        description: 'Popis mého API',
        contact: {
            name: 'Jan Sakač',
            email: 'sakacja1@uhk.cz',
        },
    },
    servers: [
        {
            urls: [
                {
                    url: 'http://localhost:8080/api',
                    description: 'API Gateway server'
                },
                {
                    url: 'http://localhost:3001/api',
                    description: 'User Management server'
                },
                {
                    url: 'http://localhost:3002/api',
                    description: 'Membership server'
                },
                {
                    url: 'http://localhost:3003/api',
                    description: 'Booking server'
                },
            ]

        }
    ],
};

module.exports = swaggerDefinition;
