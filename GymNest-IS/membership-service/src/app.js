const express = require('express');
const sequelize = require('./sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');
const cors = require('cors');
const morgan = require('morgan');
const membershipRoutes = require('./routes/membershipRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const Membership = require('./models/Membership');
const MembershipType = require('./models/MembershipType');
const Payment = require('./models/Payment');
const dataInitializer = require('./utils/dataInitializer');

Membership.belongsTo(MembershipType, {
    foreignKey: 'membershipTypeId',
    as: 'membershipType'
});

MembershipType.hasMany(Membership, {
    foreignKey: 'membershipTypeId',
    as: 'memberships'
});

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

// Použití rout pro členství
app.use('/api', membershipRoutes);

// Použití rout pro platby
app.use('/api', paymentRoutes);

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3002;


async function startServer() {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized.');

        await dataInitializer.initializeData();
        console.log('Initial data setup completed.');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error during server initialization:', err);
    }
}

startServer();