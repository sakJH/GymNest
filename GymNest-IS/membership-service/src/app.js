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

// Improved database initialization and server start
async function initializeDatabaseAndStartServer() {
    try {
        await sequelize.sync({ force: false });
        console.log('Databáze a tabulky byly synchronizovány');

        // Sequential initializations
        await createMembershipAndPayment(1, 2, 1000);
        await createMembershipAndPayment(2, 2, 500);
        await createMembershipAndPayment(3, 3, 800);
        await createMembershipAndPayment(4, 1, 400);

        // Start listening only after DB initialization
        app.listen(PORT, () => {
            console.log(`Server běží na portu ${PORT}`);
        });
    } catch (err) {
        console.error('Při inicializaci databáze došlo k chybě:', err);
    }
}

async function createMembershipAndPayment(userId, membershipTypeId, paymentAmount) {
    try {
        const membership = await createInitialMembership(userId, membershipTypeId);
        console.log('Inicial Membership created');

        // Ensure membership is created before creating a payment
        if (membership) {
            const payment = await createInitialPayment(membership.id, paymentAmount);
            console.log('Initial Payment created');
        }
    } catch (err) {
        console.error(`Failed to create Membership or Payment for user ${userId}:`, err);
    }
}

async function createInitialMembership(userId, typeId) {
    const startDate = new Date();
    const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

    try {
        const exists = await Membership.findOne({ where: { userId, membershipTypeId: typeId } });
        if (!exists) {
            const membership = await Membership.create({
                userId,
                membershipTypeId: typeId,
                startDate,
                endDate,
                status: 'active'
            });
            console.log(`Membership created for user ID: ${userId}`);
            return membership;  // Return the created membership object for further use
        } else {
            console.log(`Membership already exists for user ID: ${userId}`);
            return exists;  // Return the existing membership if already present
        }
    } catch (err) {
        console.error(`Membership error for user ID: ${userId}:`, err);
        throw err;  // Rethrow the error to handle it in the calling function
    }
}

async function createInitialPayment(membershipId, amount, status = 'completed') {
    try {
        const paymentDate = new Date();
        const payment = await Payment.create({
            amount,
            paymentDate,
            status,
            membershipId,
            description: 'Initial payment'
        });
        console.log(`Payment created for Membership ID: ${membershipId}`);
        return payment;  // Return the created payment object for further use
    } catch (err) {
        console.error(`Payment error for Membership ID: ${membershipId}:`, err);
        throw err;  // Rethrow the error to handle it in the calling function
    }
}

// Start the server and initialize the database
initializeDatabaseAndStartServer();