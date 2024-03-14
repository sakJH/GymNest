const express = require('express');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

app.use(express.json()); // Middleware pro parsování JSON těl požadavků

// Použití rout pro předplatná
app.use('/api', subscriptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
