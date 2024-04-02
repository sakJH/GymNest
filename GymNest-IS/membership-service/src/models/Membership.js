const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Membership extends Model {
    static async createMembership(data) {
        // Metoda pro vytvoření nového členství
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
        // Metoda pro vyhledání členství podle ID
        try {
            return await this.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    static async deleteMembership(id) {
        // Metoda pro odstranění členství podle ID
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
        // Metoda pro získání všech členství
        try {
            return await this.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async findMembershipsByUserId(userId) {
        // Metoda pro vyhledání všech členství daného uživatele
        try {
            return await this.findAll({ where: { userId } });
        } catch (error) {
            throw error;
        }
    }

    // TODO - další metody???

}

Membership.init({
    // Definice atributů modelu
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
    // Další atributy
}, {
    sequelize,
    modelName: 'Membership',
    timestamps: true, // Povolit automatické timestampy createdAt a updatedAt
});

module.exports = Membership;
