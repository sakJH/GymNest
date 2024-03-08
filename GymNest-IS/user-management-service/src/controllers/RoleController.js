const RoleService = require('../services/RoleService');

class RoleController {
    // Handler pro inicializaci předdefinovaných rolí
    static async initializeRoles(req, res) {
        try {
            await RoleService.initializeRoles();
            res.status(200).json({ message: 'Role byly úspěšně inicializovány.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Handler pro získání všech rolí
    static async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Handler pro získání uživatelů podle role
    static async findUsersByRole(req, res) {
        try {
            const { roleName } = req.params;
            const users = await RoleService.findUsersByRole(roleName);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Handler pro nastavení defaultní role "člen" pro uživatele
    static async setDefaultRole(req, res) {
        try {
            const { userId } = req.params;
            await RoleService.setDefaultRole(userId);
            res.status(200).json({ message: `Uživateli ${userId} byla nastavena defaultní role člen.` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Handler pro odstranění role uživateli a přidělení defaultní role "člen"
    static async removeRoleToUser(req, res) {
        try {
            const { userId } = req.params;
            await RoleService.removeRoleToUser(userId);
            res.status(200).json({ message: `Uživateli ${userId} byla odebrána role a přidělena defaultní role člen.` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Přidejte další handler metody podle potřeby...
}

module.exports = RoleController;
