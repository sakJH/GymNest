const express = require('express');
const sequelize = require('./sequelize');

const membershipRoutes = require('./routes/membershipRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

app.use(express.json()); // Middleware pro parsování JSON těl požadavků

// Použití rout pro členství
app.use('/api', membershipRoutes);

// Použití rout pro předplatná
app.use('/api', subscriptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
