const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Notification extends Model {
    // Vytvoření nové notifikace
    static async createNotification(details) {
        try {
            const notification = await this.create(details);
            return notification;
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace notifikace
    static async updateNotification(notificationId, updateDetails) {
        try {
            const notification = await this.findByPk(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }
            await notification.update(updateDetails);
            return notification;
        } catch (error) {
            throw error;
        }
    }

    // Zrušení notifikace
    static async deleteNotification(notificationId) {
        try {
            const notification = await this.findByPk(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }
            await notification.destroy();
            return { message: 'Notification successfully deleted' };
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání notifikace podle ID
    static async findNotificationById(notificationId) {
        try {
            const notification = await this.findByPk(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }
            return notification;
        } catch (error) {
            throw error;
        }
    }

    // Získání všech notifikací
    static async findAllNotifications() {
        try {
            return await this.findAll();
        } catch (error) {
            throw error;
        }
    }

    // Nastavení notifikace na "přečteno"
    static async markAsRead(notificationId) {
        try {
            const notification = await this.findByPk(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }
            notification.status = 'read';
            await notification.save();
            return notification;
        } catch (error) {
            throw error;
        }
    }
}

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unread' // Možné hodnoty: 'unread', 'read'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications'
});

module.exports = Notification;
