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
    await initializeData(); // Zavolejte funkci pro inicializaci dat
    app.listen(PORT, () => {
        console.log(`Server běží na portu ${PORT}.`);
    });
}).catch(err => console.error('Při synchronizaci databáze došlo k chybě:', err));

async function initializeData() {
    // Inicializace dat pro Activities
    const activities = await Activity.bulkCreate([
        { name: 'Yoga', description: 'Jemná jóga pro začátečníky.', type: 'wellness', duration: 60 },
        { name: 'Spinning', description: 'Intenzivní spinning class pro pokročilé.', type: 'fitness', duration: 45 },
        { name: 'Pilates', description: 'Pilates focení na jádro a flexibilitu.', type: 'wellness', duration: 50 },
        { name: 'Crossfit', description: 'Vysoko intenzivní trénink pro všechny úrovně.', type: 'fitness', duration: 60 },
        { name: 'Zumba', description: 'Zábavná taneční cvičební třída.', type: 'dance', duration: 50 },
        { name: 'HIIT', description: 'Vysokointenzivní intervalový trénink.', type: 'fitness', duration: 45 },
        { name: 'Aerobic', description: 'Tradiční kardio třída zaměřená na vytrvalost.', type: 'fitness', duration: 60 },
        { name: 'Box', description: 'Boxerský trénink pro zlepšení síly a obratnosti.', type: 'fight', duration: 45 },
        { name: 'Pole dance', description: 'Taneční třída s tyčí pro zlepšení flexibility a síly.', type: 'dance', duration: 50 },
        { name: 'Pump', description: 'Kombinace kardio a silového tréninku.', type: 'fitness', duration: 60 }
    ]);

    console.log('Activities initialized');

    // Získání ID aktivit pro použití v rozvrzích a rezervacích
    const activityIds = await Activity.findAll({
        attributes: ['id', 'name']
    });

    // Mapování názvů na ID pro snadné použití
    const activityIdMap = activityIds.reduce((acc, current) => {
        acc[current.name] = current.id;
        return acc;
    }, {});

    // Inicializace dat pro Schedules
    const schedules = await Schedule.bulkCreate([
        { activityId: activityIdMap['Yoga'], startTime: new Date('2024-04-21 10:00:00'), endTime: new Date('2024-04-21 11:00:00'), capacity: 10 },
        { activityId: activityIdMap['Spinning'], startTime: new Date('2024-04-22 12:00:00'), endTime: new Date('2024-04-22 12:45:00'), capacity: 15 },
        { activityId: activityIdMap['Pilates'], startTime: new Date('2024-04-23 14:00:00'), endTime: new Date('2024-04-23 14:50:00'), capacity: 8 },
        { activityId: activityIdMap['Crossfit'], startTime: new Date('2024-04-24 10:00:00'), endTime: new Date('2024-04-24 11:00:00'), capacity: 10 },
        { activityId: activityIdMap['Zumba'], startTime: new Date('2024-04-25 12:00:00'), endTime: new Date('2024-04-25 12:45:00'), capacity: 15 },
        { activityId: activityIdMap['HIIT'], startTime: new Date('2024-04-26 14:00:00'), endTime: new Date('2024-04-26 14:50:00'), capacity: 8 },
        { activityId: activityIdMap['Aerobic'], startTime: new Date('2024-04-26 10:00:00'), endTime: new Date('2024-04-26 11:00:00'), capacity: 10 },
        { activityId: activityIdMap['Box'], startTime: new Date('2024-04-27 12:00:00'), endTime: new Date('2024-04-27 12:45:00'), capacity: 15 },
        { activityId: activityIdMap['Pole dance'], startTime: new Date('2024-04-28 14:00:00'), endTime: new Date('2024-04-28 14:50:00'), capacity: 8 },
        { activityId: activityIdMap['Pump'], startTime: new Date('2024-04-29 10:00:00'), endTime: new Date('2024-04-29 11:00:00'), capacity: 10 },
        { activityId: activityIdMap['Pump'], startTime: new Date('2024-04-30 12:00:00'), endTime: new Date('2024-04-30 12:45:00'), capacity: 15 }
    ]);

    console.log('Schedules initialized');

    // Inicializace dat pro Bookings
    const bookings = await Booking.bulkCreate([
        { userId: 1, activityId: activityIdMap['Yoga'], scheduleId: 1, status: 'scheduled', bookingDate: new Date('2024-04-23') },
        { userId: 2, activityId: activityIdMap['Spinning'], scheduleId: 2, status: 'scheduled', bookingDate: new Date('2024-04-24') },
        { userId: 3, activityId: activityIdMap['Pilates'], scheduleId: 3, status: 'scheduled', bookingDate: new Date('2024-04-25') },
        { userId: 2, activityId: activityIdMap['Yoga'], scheduleId: 1, status: 'scheduled', bookingDate: new Date('2024-04-26') },
        { userId: 1, activityId: activityIdMap['Spinning'], scheduleId: 2, status: 'scheduled', bookingDate: new Date('2024-04-27') },
        { userId: 3, activityId: activityIdMap['Yoga'], scheduleId: 1, status: 'scheduled', bookingDate: new Date('2024-04-26') },
        { userId: 2, activityId: activityIdMap['Pilates'], scheduleId: 3, status: 'scheduled', bookingDate: new Date('2024-04-28') }
    ]);

    console.log('Bookings initialized');

    // Inicializace dat pro Notifications
    const notifications = await Notification.bulkCreate([
        { userId: 1, title: 'Upozornění na třídu', message: 'Vaše třída Yogy začíná v 10:00, dne 2024-04-21.', status: 'unread' },
        { userId: 2, title: 'Upozornění na třídu', message: 'Vaše třída Spinningu začíná v 12:00, dne 2024-04-22.', status: 'unread' },
        { userId: 3, title: 'Upozornění na třídu', message: 'Vaše třída Pilates začíná v 14:00, dne 2024-04-23.', status: 'unread' },
        { userId: 2, title: 'Upozornění na třídu', message: 'Vaše třída Crossfitu začíná v 10:00, dne 2024-04-24.', status: 'unread' },
        { userId: 1, title: 'Upozornění na třídu', message: 'Vaše třída Zumby začíná v 12:00, dne 2024-04-25.', status: 'unread' },
        { userId: 2, title: 'Upozornění na třídu', message: 'Vaše třída HIIT začíná v 14:00, dne 2024-04-26.', status: 'unread' },
        { userId: 3, title: 'Upozornění na třídu', message: 'Vaše třída Aerobicu začíná v 10:00, dne 2024-04-26.', status: 'unread' },
        { userId: 2, title: 'Upozornění na třídu', message: 'Vaše třída Boxu začíná v 12:00, dne 2024-04-27.', status: 'unread' },
        { userId: 2, title: 'Upozornění na třídu', message: 'Vaše třída Pole dance začíná v 14:00, dne 2024-04-28.', status: 'unread' },
        { userId: 1, title: 'Upozornění na třídu', message: 'Vaše třída Pump začíná v 10:00, dne 2024-04-29.', status: 'unread' },
        { userId: 2, title: 'Upozornění na třídu', message: 'Vaše třída Yogy začíná znovu v 12:00, dne 2024-04-30.', status: 'unread' },
        { userId: 3, title: 'Upozornění na třídu', message: 'Vaše třída Spinningu začíná znovu v 14:00, dne 2024-04-30.', status: 'unread' }
    ]);

    console.log('Notifications initialized');
}

module.exports = app;