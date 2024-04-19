const express = require('express');
const RoleService = require('../services/RoleService');

class RoleController {
    // Inicializace rolí
    static async initializeRoles(req, res) {
        try {
            await RoleService.initializeRoles();
            res.status(201).json({ message: 'Role byly úspěšně inicializovány' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Získání všech rolí
    static async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Hledání uživatelů podle role
    static async findUsersByRole(req, res) {
        const { roleName } = req.params;
        try {
            const users = await RoleService.findUsersByRole(roleName);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Nastavení defaultní role uživateli
    static async setDefaultRole(req, res) {
        const { userId } = req.params;
        try {
            const user = await RoleService.setDefaultRole(userId);
            res.json({ message: `Default role was set for user ${userId}`, user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Odstranění role uživateli
    static async removeRoleToUser(req, res) {
        const { userId } = req.params;
        try {
            const user = await RoleService.removeRoleToUser(userId);
            res.json({ message: `Role was removed from user ${userId}`, user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RoleController;
