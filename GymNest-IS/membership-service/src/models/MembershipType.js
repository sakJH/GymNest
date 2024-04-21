const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class MembershipType extends Model {

    // Vytvoření nového typu členství
    static async createType(data) {
        try {
            return await this.create(data);
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace typu členství
    static async updateType(id, updateData) {
        try {
            const [updatedRows] = await this.update(updateData, { where: { id } });
            if (updatedRows === 0) {
                throw new Error('Membership Type not found or data identical');
            }
            return { message: 'Membership Type successfully updated' };
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání typu členství podle ID
    static async findTypeById(id) {
        try {
            return await this.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    // Odstranění typu členství dle ID
    static async deleteType(id) {
        try {
            const type = await this.findByPk(id);
            if (!type) {
                throw new Error('Membership Type not found');
            }
            await type.destroy();
            return { message: 'Membership Type successfully deleted' };
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání všech typů členství
    static async findAllTypes() {
        try {
            return await this.findAll();
        } catch (error) {
            throw error;
        }
    }
}

MembershipType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    membershipName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    membershipPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'CZK'
    },
    expirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'MembershipType',
    tableName: 'membershipTypes',
    timestamps: true
});

module.exports = MembershipType;
