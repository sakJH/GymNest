// Membership.js
const { Model, DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../sequelize');
const MembershipType = require("./MembershipType");

class Membership extends Model {
    // Vytvoření nového členství
    static async createMembership(data) {
        try {
            return await this.create(data);
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace členství
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

    // Vyhledání členství podle ID
    static async findMembershipById(id) {
        try {
            return await this.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    // Odstranění členství
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

    // Vyhledání všech členství
    static async findAllMemberships() {
        try {
            return await this.findAll({
                include: [{
                    model: MembershipType,
                    as: 'membershipType'
                }]
            });
        } catch (error) {
            throw error;
        }
    }


    // Vyhledání členství podle ID uživatele
    static async findMembershipsByUserId(userId) {
        try {
            return await this.findAll({ where: { userId } });
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání členství podle stavu
    static async findByStatus(status) {
        return await this.findAll({
            where: { status }
        });
    }

    // Vyhledání expirujících členství
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

    // Obnovení členství
    static async renewMembership(id, durationMonths = 12) {
        const membership = await this.findByPk(id);
        if (!membership) throw new Error('Membership not found');

        const newEndDate = new Date(membership.endDate);
        newEndDate.setMonth(newEndDate.getMonth() + durationMonths);

        membership.endDate = newEndDate;
        await membership.save();

        return membership;
    }

    // Změna typu členství
    static async changeMembershipType(id, newTypeId) {
        const membership = await this.findByPk(id);
        if (!membership) throw new Error('Membership not found');

        membership.membershipTypeId = newTypeId;
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
    membershipTypeId: {
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'membershipTypes',
            key: 'id'
        }
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
    tableName: 'memberships',
    timestamps: true
});

module.exports = Membership;
