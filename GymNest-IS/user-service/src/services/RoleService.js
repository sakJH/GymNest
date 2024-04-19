const Role = require('../models/Role');
const User = require('../models/User'); // Předpokládáme, že model User existuje

class RoleService {
    static async initializeRoles() {
        try {
            return await Role.initializeRoles();
        } catch (error) {
            console.error('Služba - Chyba při inicializaci rolí:', error);
            throw new Error('Služba - Nepodařilo se inicializovat role');
        }
    }

    static async getAllRoles() {
        try {
            return await Role.getAllRoles();
        } catch (error) {
            console.error('Služba - Chyba při získávání všech rolí:', error);
            throw new Error('Služba - Nepodařilo se získat seznam rolí');
        }
    }

    static async findUsersByRole(roleName) {
        try {
            const role = await Role.findUsersByRole(roleName);
            if (!role) {
                throw new Error('Role neexistuje');
            }
            const users = await User.findAll({
                where: { roleId: role.id }
            });
            return users;
        } catch (error) {
            console.error('Služba - Chyba při hledání uživatelů podle role:', error);
            throw new Error('Služba - Nepodařilo se najít uživatele s danou rolí');
        }
    }

    static async setDefaultRole(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`Služba - Uživatel s ID ${userId} nebyl nalezen.`);
            }
            user.roleId = 1; // Nastavení default role (předpokládáme, že role "člen" má ID 1)
            await user.save();
            return user;
        } catch (error) {
            console.error('Služba - Chyba při nastavování defaultní role:', error);
            throw new Error('Služba - Nepodařilo se nastavit defaultní roli');
        }
    }

    static async removeRoleToUser(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`Služba - Uživatel s ID ${userId} nebyl nalezen.`);
            }
            user.roleId = 1; // Nastavení default role (předpokládáme, že role "člen" má ID 1)
            await user.save();
            return user;
        } catch (error) {
            console.error('Služba - Chyba při odstraňování role uživateli:', error);
            throw new Error('Služba - Nepodařilo se odstranit roli uživateli');
        }
    }
}

module.exports = RoleService;
