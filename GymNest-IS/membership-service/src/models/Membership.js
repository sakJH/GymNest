//Membership.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Membership extends Model {

    static async createMembership(data) {
        try {
            return await this.create(data);
        } catch (error) {
            throw error;
        }
    }

    static async updateMembership(id, updateData) {
        try {
            const [updatedRows] = await this.update(updateData, { where: { id } });
            if (updatedRows === 0) {
                throw new Error('Membership not found or data identical');
            }
            return { message: 'Membership successfully updated' };
        } catch (error) {
            throw error;
        }
    }

    static async findMembershipById(id) {
        try {
            return await this.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    static async deleteMembership(id) {
        try {
            const membership = await this.findByPk(id);
            if (!membership) {
                throw new Error('Membership not found');
            }
            await membership.destroy();
            return { message: 'Membership successfully deleted' };
        } catch (error) {
            throw error;
        }
    }

    static async findAllMemberships() {
        try {
            return await this.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async findMembershipsByUserId(userId) {
        try {
            return await this.findAll({ where: { userId } });
        } catch (error) {
            throw error;
        }
    }

    // Původní metody z Subscription

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

    static async findByStatus(status) {
        return await this.findAll({
            where: { status }
        });
    }

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

    static async renewMembership(id, durationMonths = 12) {
        const membership = await this.findByPk(id);
        if (!membership) throw new Error('Membership not found');

        const newEndDate = new Date(membership.endDate);
        newEndDate.setMonth(newEndDate.getMonth() + durationMonths);

        membership.endDate = newEndDate;
        await membership.save();

        return membership;
    }

    //Metoda pro změnu typu předplatného
    static async changeMembershipType(id, newType) {
        const membership = await this.findByPk(id);
        if (!membership) throw new Error('Membership not found');

        membership.membershipType = newType;
        await membership.save();

        return membership;
    }

}

Membership.init({
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER, allowNull: false
    },
    membershipType: {
        type: DataTypes.STRING, allowNull: false
    },
    membershipPrice: {
        type: DataTypes.DECIMAL(10, 2), allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY, allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY, allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    sequelize,
    modelName: 'Membership',
    timestamps: true
});

module.exports = Membership;
