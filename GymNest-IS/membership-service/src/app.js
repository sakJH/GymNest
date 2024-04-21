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

app.use(express.json()); // Middleware pro parsování JSON těl požadavků

// Použití rout pro členství
app.use('/api', membershipRoutes);

// Použití rout pro platby
app.use('/api', paymentRoutes);

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});

sequelize.sync({ force: false }).then(() => {
    console.log('Databáze a tabulky byly synchronizovány');
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));