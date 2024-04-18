const NotificationService = require('../services/NotificationService');

class NotificationController {
    async createNotification(req, res) {
        try {
            const details = req.body;
            const notification = await NotificationService.createNotification(details);
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateNotification(req, res) {
        try {
            const { notificationId, updateDetails } = req.body;
            const updatedNotification = await NotificationService.updateNotification(notificationId, updateDetails);
            res.json(updatedNotification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteNotification(req, res) {
        try {
            const { notificationId } = req.params;
            await NotificationService.deleteNotification(notificationId);
            res.json({ message: 'Notification successfully deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findNotificationById(req, res) {
        try {
            const { notificationId } = req.params;
            const notification = await NotificationService.findNotificationById(notificationId);
            if (notification) {
                res.json(notification);
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findAllNotifications(req, res) {
        try {
            const { userId } = req.params;
            const notifications = await NotificationService.findAllNotifications(userId);
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async markAsRead(req, res) {
        try {
            const { notificationId } = req.params;
            const notification = await NotificationService.markAsRead(notificationId);
            res.json({ message: 'Notification marked as read', notification });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NotificationController();
