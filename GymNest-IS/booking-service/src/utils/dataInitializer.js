// utils/dataInitializer.js
const Activity = require('../models/Activity');
const Schedule = require('../models/Schedule');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');

async function initializeActivities() {
    // List of activities to initialize
    const activitiesData = [
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

    ];

    for (const data of activitiesData) {
        const exists = await Activity.findOne({ where: { name: data.name } });
        if (!exists) {
            await Activity.create(data);
        }
    }
    console.log('Activities initialized');
}

async function initializeSchedules() {
    const activities = await Activity.findAll();
    const activityIdMap = activities.reduce((map, item) => {
        map[item.name] = item.id;
        return map;
    }, {});

    const schedulesData = [
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
    ];

    for (const data of schedulesData) {
        await Schedule.create(data);
    }
    console.log('Schedules initialized');
    return activityIdMap;
}

async function initializeBookings() {
    const activities = await Activity.findAll();
    const activityIdMap = activities.reduce((map, item) => {
        map[item.name] = item.id;
        return map;
    }, {});

    const bookingsData = [
        // Define your bookings based on actual schedule IDs
        { userId: 1, activityId: activityIdMap['Yoga'], scheduleId: 1, status: 'scheduled', bookingDate: new Date('2024-04-23') },
        { userId: 2, activityId: activityIdMap['Spinning'], scheduleId: 2, status: 'scheduled', bookingDate: new Date('2024-04-24') },
        { userId: 3, activityId: activityIdMap['Pilates'], scheduleId: 3, status: 'scheduled', bookingDate: new Date('2024-04-25') },
        { userId: 2, activityId: activityIdMap['Yoga'], scheduleId: 1, status: 'scheduled', bookingDate: new Date('2024-04-26') },
        { userId: 1, activityId: activityIdMap['Spinning'], scheduleId: 2, status: 'scheduled', bookingDate: new Date('2024-04-27') },
        { userId: 3, activityId: activityIdMap['Yoga'], scheduleId: 1, status: 'scheduled', bookingDate: new Date('2024-04-26') },
        { userId: 2, activityId: activityIdMap['Pilates'], scheduleId: 3, status: 'scheduled', bookingDate: new Date('2024-04-28') }
    ];

    for (const data of bookingsData) {
        await Booking.create(data);
    }
    console.log('Bookings initialized');
}

async function initializeNotifications() {
    // Notifications setup
    const notificationsData = [
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
    ];

    for (const data of notificationsData) {
        await Notification.create(data);
    }
    console.log('Notifications initialized');
}

async function initializeData() {
    await initializeActivities();
    await initializeSchedules();
    await initializeBookings();
    await initializeNotifications();
}

module.exports = { initializeData };
