const Role = require('../models/Role');
const User = require('../models/User');

class RoleService {
    // Metoda pro inicializaci předdefinovaných rolí
    static async initializeRoles() {
        const roles = ['člen', 'trenér', 'admin'];
        try {
            for (const roleName of roles) {
                const [role, created] = await Role.findOrCreate({
                    where: { roleName },
                    defaults: { roleName }
                });

                if (created) {
                    console.log(`Role ${roleName} byla úspěšně vytvořena.`);
                }
            }
        } catch (error) {
            console.error('Nepodařilo se inicializovat role:', error);
            throw error;
        }
    }

    // Metoda pro získání všech rolí
    static async getAllRoles() {
        try {
            return await Role.findAll();
        } catch (error) {
            console.error('Nepodařilo se získat role:', error);
            throw error;
        }
    }

    // Metoda pro získání uživatelů podle jejich role
    static async findUsersByRole(roleName) {
        try {
            const role = await Role.findOne({ where: { roleName } });
            if (!role) {
                throw new Error(`Role ${roleName} neexistuje.`);
            }
            const users = await role.getUsers(); // Předpokládejme, že existuje asociace mezi Role a User
            return users;
        } catch (error) {
            console.error('Nepodařilo se najít uživatele pro roli:', error);
            throw error;
        }
    }

    // Metoda pro nastavení defaultní role "člen" pro uživatele
    static async setDefaultRole(userId) {
        try {
            const defaultRole = await Role.findOne({ where: { roleName: 'člen' } });
            await User.update({ roleId: defaultRole.id }, { where: { id: userId } });
            console.log(`Uživateli ${userId} byla nastavena defaultní role člen.`);
        } catch (error) {
            console.error('Nepodařilo se nastavit defaultní roli uživateli:', error);
            throw error;
        }
    }

    // Metoda pro odstranění role uživateli a přidělení defaultní role "člen"
    static async removeRoleToUser(userId) {
        try {
            const defaultRole = await Role.findOne({ where: { roleName: 'člen' } });
            await User.update({ roleId: defaultRole.id }, { where: { id: userId } });
            console.log(`Uživateli ${userId} byla odebrána role a přidělena defaultní role člen.`);
        } catch (error) {
            console.error('Nepodařilo se odebrat roli uživateli:', error);
            throw error;
        }
    }

    //TODO - další metody?
}

module.exports = RoleService;
