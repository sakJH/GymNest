const express = require('express');
const NotificationController = require('../controllers/NotificationController');

// Vytvoření routeru
const router = express.Router();

// Definice cesty pro vytvoření nové notifikace
router.post('/notifications', NotificationController.createNotification);

// Definice cesty pro aktualizaci notifikace
router.put('/notifications', NotificationController.updateNotification);

// Definice cesty pro smazání notifikace podle ID
router.delete('/notifications/:notificationId', NotificationController.deleteNotification);

// Definice cesty pro vyhledání notifikace podle ID
router.get('/notifications/:notificationId', NotificationController.findNotificationById);

// Definice cesty pro získání všech notifikací pro daného uživatele
router.get('/notifications', NotificationController.findAllNotifications);

// Definice cesty pro označení notifikace jako přečtené
router.patch('/notifications/:notificationId/read', NotificationController.markAsRead);

module.exports = router;
