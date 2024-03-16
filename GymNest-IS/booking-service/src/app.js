const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');

const activityRoutes = require('./routes/activityRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Vytvoření instance Express aplikace
const app = express();

// Middleware pro parsování JSON těl požadavků
app.use(express.json());

// Nastavení rout pro správu rezervací
app.use('/api', bookingRoutes);

app.use('/api', activityRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', notificationRoutes);

// Nastavení portu, na kterém bude aplikace naslouchat
const PORT = process.env.PORT || 3003;

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}.`);
});

module.exports = app;
