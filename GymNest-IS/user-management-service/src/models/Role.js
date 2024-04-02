const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Role extends Model {
    static async initializeRoles() {
        try {
            await this.bulkCreate([
                { roleName: 'člen' },
                { roleName: 'trenér' },
                { roleName: 'admin' },
            ]);
        } catch (error) {
            console.error('Chyba při inicializaci rolí:', error);
            throw error;
        }
    }

    static async getAllRoles() {
        return this.findAll();
    }

    static async findUsersByRole(roleName) {
        return this.findOne({ where: { roleName } });
    }

    static async setDefaultRole(userId) {
        try {
            const user = await this.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`Uživatel s ID ${userId} nebyl nalezen.`);
            }
            user.roleId = 1; // ID role "člen"
            await user.save();
            return user;
        } catch (error) {
            console.error('Chyba při nastavování defaultní role:', error);
            throw error;
        }
    }

    static async removeRoleToUser(userId) {
        try {
            const user = await this.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`Uživatel s ID ${userId} nebyl nalezen.`);
            }
            user.roleId = 1; // ID role "člen"
            await user.save();
            return user;
        } catch (error) {
            console.error('Chyba při odstraňování role uživateli:', error);
            throw error;
        }
    }
}

Role.init({
    // Definice atributů modelu
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isIn: [['člen', 'trenér', 'admin']], // Předdefinovaný seznam rolí
        },
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false, // V tomto případě nemusíme sledovat čas vytvoření a aktualizace
});

module.exports = Role;

// TODO - asi není hotové