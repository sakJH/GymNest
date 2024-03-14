const Notification = require('../models/Notification');

class NotificationService {
    // Vytvoření nové notifikace
    async createNotification(details) {
        return await Notification.createNotification(details);
    }

    // Aktualizace notifikace
    async updateNotification(notificationId, updateDetails) {
        return await Notification.updateNotification(notificationId, updateDetails);
    }

    // Zrušení notifikace
    async deleteNotification(notificationId) {
        return await Notification.deleteNotification(notificationId);
    }

    // Vyhledání notifikace podle ID
    async findNotificationById(notificationId) {
        return await Notification.findNotificationById(notificationId);
    }

    // Získání všech notifikací pro daného uživatele
    async findAllNotifications(userId) {
        return await Notification.findAll({
            where: {
                userId: userId
            }
        });
    }

    // Označení notifikace jako přečtené
    async markAsRead(notificationId) {
        return await Notification.markAsRead(notificationId);
    }

}

module.exports = new NotificationService();
