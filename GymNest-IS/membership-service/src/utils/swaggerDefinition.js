// swaggerDefinition.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Membership Service',
        version: '1.0.0',
        description: 'Membership Service API for GymNest-IS project.',
        contact: {
            name: 'Jan Sakač',
            email: 'sakacja1@uhk.cz'
        },
    },
    servers: [
        {
            url: 'http://localhost:3002/api',
            description: 'Membership Service'
        }
    ],
};

module.exports = swaggerDefinition;
