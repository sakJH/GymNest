// swaggerDefinition.js
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Booking Service',
        version: '1.0.0',
        description: 'Booking Service API for GymNest-IS project.',
        contact: {
            name: 'Jan Sakač',
            email: 'sakacja1@uhk.cz'
        },
    },
    servers: [
        {
            url: 'http://localhost:3003/api',
            description: 'Booking Service'
        }
    ],
};

module.exports = swaggerDefinition;
