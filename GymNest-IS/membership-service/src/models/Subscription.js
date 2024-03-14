const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Subscription extends Model {
    // Metoda pro získání aktivních předplatných
    static async findActive() {
        return await this.findAll({
            where: {
                status: 'active'
            }
        });
    }

    // Metoda pro pozastavení předplatného
    static async pauseSubscription(id) {
        const subscription = await this.findByPk(id);
        if (!subscription) throw new Error('Subscription not found');

        subscription.status = 'paused';
        await subscription.save();
        return subscription;
    }

    // Metoda pro reaktivaci předplatného
    static async reactivateSubscription(id) {
        const subscription = await this.findByPk(id);
        if (!subscription) throw new Error('Subscription not found');

        subscription.status = 'active';
        await subscription.save();
        return subscription;
    }

    // Metoda pro zrušení předplatného
    static async cancelSubscription(id) {
        const subscription = await this.findByPk(id);
        if (!subscription) throw new Error('Subscription not found');

        subscription.status = 'cancelled';
        await subscription.save();
        return subscription;
    }

    // Metoda pro získání předplatného podle typu
    static async findByType(type) {
        return await this.findAll({
            where: { type }
        });
    }

    // Metoda získání předplatných blížících se konci
    static async findExpiringSoon(days = 30) {
        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + days);

        return await this.findAll({
            where: {
                endDate: {
                    [Sequelize.Op.lt]: targetDate
                },
                status: 'active'
            }
        });
    }

    // Metoda pro obnovení předplatného
    static async renewSubscription(id, durationMonths = 12) {
        const subscription = await this.findByPk(id);
        if (!subscription) throw new Error('Subscription not found');

        const newEndDate = new Date(subscription.endDate);
        newEndDate.setMonth(newEndDate.getMonth() + durationMonths);

        subscription.endDate = newEndDate;
        await subscription.save();

        return subscription;
    }

    // Metoda pro získání předplatného podle statusu
    static async findByStatus(status) {
        return await this.findAll({
            where: { status }
        });
    }

    //Metoda pro změnu typu předplatného
    static async changeSubscriptionType(id, newType) {
        const subscription = await this.findByPk(id);
        if (!subscription) throw new Error('Subscription not found');

        subscription.type = newType;
        await subscription.save();

        return subscription;
    }

    //TODO - další metody???
}

Subscription.init({
    // ID předplatného
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Typ předplatného
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Cena předplatného
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    // Datum začátku
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // Datum konce
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // Vztah k uživateli
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Název tabulky uživatelů
            key: 'id'
        }
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active', // Výchozí stav předplatného na "active"
    },

}, {
    sequelize,
    modelName: 'Subscription',
    timestamps: true // Povolit automatické timestampy createdAt a updatedAt
});

module.exports = Subscription;
