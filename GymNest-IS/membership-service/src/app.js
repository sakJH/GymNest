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
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});

sequelize.sync({ force: false }).then(() => {
    createInitialMembership(1, 2).then(r => console.log('Inicial Membership created')).catch(err => console.error('Failed to create Membership user:', err));
    createInitialPayment(1, 1, 1000).then(r => console.log('Inicial Payment created')).catch(err => console.error('Failed to create Payment:', err));

    createInitialMembership(2, 2).then(r => console.log('Inicial Membership created')).catch(err => console.error('Failed to create Membership user:', err));
    createInitialPayment(2, 2, 500).then(r => console.log('Inicial Payment created')).catch(err => console.error('Failed to create Payment:', err));

    createInitialMembership(3, 3).then(r => console.log('Inicial Membership created')).catch(err => console.error('Failed to create Membership user:', err));
    createInitialPayment(3, 1, 800).then(r => console.log('Inicial Payment created')).catch(err => console.error('Failed to create Payment:', err));

    createInitialMembership(4, 1).then(r => console.log('Inicial Membership created')).catch(err => console.error('Failed to create Membership user:', err));
    createInitialPayment(4, 1, 400).then(r => console.log('Inicial Payment created')).catch(err => console.error('Failed to create Payment:', err));
    console.log('Databáze a tabulky byly synchronizovány');
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));

//Inicializace dat
async function createInitialMembership(userId, typeId) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);

    try {
        const exists = await Membership.findOne({ where: { userId } });
        if (!exists) {
            await Membership.create({
                userId,
                membershipTypeId: typeId,
                startDate: startDate,
                endDate: endDate,
                status: 'active'
            });
            console.log(`Membership created for user ID: ${userId}`);
        }
    } catch (err) {
        console.log(`Membership error for user ID: ${userId}`);
    }
}

async function createInitialPayment(userId, membershipId, amount, status = 'completed') {
    const paymentExists = await Payment.findOne({ where: { membershipId } });
    if (!paymentExists) {
        await Payment.create({
            amount,
            paymentDate: new Date(),
            status,
            membershipId,
            description: 'Initial payment'
        });
        console.log(`Payment created for Membership ID: ${membershipId}`);
    }
}