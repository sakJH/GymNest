const express = require('express');
const sequelize = require('./sequelize');

const membershipRoutes = require('./routes/membershipRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json()); // Middleware pro parsování JSON těl požadavků

// Použití rout pro členství
app.use('/api', membershipRoutes);

// Použití rout pro předplatná
app.use('/api', subscriptionRoutes);

// Použití rout pro platby
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
