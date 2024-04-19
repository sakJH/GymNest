// swaggerDefinition.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User Management Service',
        version: '1.0.0',
        description: 'User Management Service API for GymNest-IS project.',
        contact: {
            name: 'Jan Sakač',
            email: 'sakacja1@uhk.cz',
            description: 'Semestrální projekt na předmět MOIS'
        },
    },
    servers: [
        {
            url: 'http://localhost:3001/api',
            description: 'API server for User Management Service'
        }
    ],
};

module.exports = swaggerDefinition;
