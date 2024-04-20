const Notification = require('../models/Notification');

class NotificationService {
    // Vytvoření nové notifikace
    async createNotification(details) {
        try {
            return await Notification.createNotification(details);
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    // Aktualizace notifikace
    async updateNotification(notificationId, updateDetails) {
        try {
            return await Notification.updateNotification(notificationId, updateDetails);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Zrušení notifikace
    async deleteNotification(notificationId) {
        try {
            return await Notification.deleteNotification(notificationId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Vyhledání notifikace podle ID
    async findNotificationById(notificationId) {
        try {
            return await Notification.findNotificationById(notificationId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Získání všech notifikací pro daného uživatele
    async findAllNotifications(userId) {
        try {
            return await Notification.findAllNotifications(userId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Označení notifikace jako přečtené
    async markAsRead(notificationId) {
        try {
            return await Notification.markAsRead(notificationId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = new NotificationService();
