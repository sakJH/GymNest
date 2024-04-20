const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Role extends Model {
    static async initializeRoles() {
        try {
            await this.bulkCreate([
                { roleName: 'user' },
                { roleName: 'member' },
                { roleName: 'coach' },
                { roleName: 'admin' },
            ]);
        } catch (error) {
            console.error('Chyba při inicializaci rolí:', error);
            throw error;
        }
    }

    static async getAllRoles() {
        try {
            return this.findAll();
        } catch (error) {
            console.error('Chyba při získávání rolí:', error);
            throw error;
        }
    }

    static async findUsersByRole(roleName) {
        try {
            return this.findAll({
                where: { roleName }
            });
        } catch (error) {
            console.error('Chyba při hledání uživatelů podle role:', error);
            throw error;
        }
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
            isIn: [['user', 'member', 'coach', 'admin']],
        },
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false,
});
module.exports = Role;
