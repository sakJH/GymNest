const express = require('express');
const sequelize = require('./sequelize');
const bookingRoutes = require('./routes/bookingRoutes');

const activityRoutes = require('./routes/activityRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./utils/swaggerDefinition');
const cors = require('cors');
const morgan = require('morgan');

const Activity = require('./models/Activity');
const Schedule = require('./models/Schedule');
const Booking = require('./models/Booking');
const Notification = require('./models/Notification');
const dataInitializer = require('./utils/dataInitializer');

// Activity a Schedule
Activity.hasMany(Schedule, {
    foreignKey: 'activityId',
    as: 'schedules'
});
Schedule.belongsTo(Activity, {
    foreignKey: 'activityId',
    as: 'activity'
});

// Schedule a Booking
Schedule.hasMany(Booking, {
    foreignKey: 'scheduleId',
    as: 'bookings'
});
Booking.belongsTo(Schedule, {
    foreignKey: 'scheduleId',
    as: 'schedule'
});
Booking.belongsTo(Activity, {
    foreignKey: 'activityId',
    as: 'activity'
});

// Vytvoření instance Express aplikace
const app = express();
app.use(morgan('dev'));
app.use(cors());

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

// Middleware pro parsování JSON těl požadavků
app.use(express.json());


// Nastavení rout pro správu rezervací
app.use('/api', bookingRoutes);
app.use('/api', activityRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', notificationRoutes);

// Zpřístupnění Swagger UI na /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Nastavení portu, na kterém bude aplikace naslouchat
const PORT = process.env.PORT || 3003;

sequelize.sync({ force: false }).then(async () => {
    console.log('Databáze a tabulky byly synchronizovány');
    await dataInitializer.initializeData(); // Zavolejte funkci pro inicializaci dat
    app.listen(PORT, () => {
        console.log(`Server běží na portu ${PORT}.`);
    });
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));

module.exports = app;