const UserService = require('../services/UserService');
const express = require('express');

class UserController {
    // Vytvoření nového uživatele
    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Hledání uživatele podle uživatelského jména
    static async findUserByUsername(req, res) {
        try {
            const user = await UserService.findUserByUsername(req.params.username);
            if (!user) {
                return res.status(404).send('Uživatel nebyl nalezen.');
            }
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Odstranění uživatele podle uživatelského jména
    static async deleteUserByUsername(req, res) {
        try {
            await UserService.deleteUserByUsername(req.params.username);
            res.status(200).send('Uživatel byl úspěšně odstraněn.');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Aktualizace uživatele podle uživatelského jména
    static async updateUserByUsername(req, res) {
        try {
            const user = await UserService.updateUserByUsername(req.params.username, req.body);
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Přihlašování uživatele
    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserService.loginUser(username, password);
            res.json(user); // Zde byste měli vracet token nebo jiné přihlašovací údaje
        } catch (error) {
            res.status(401).send(error.message);
        }
    }

    // Získání seznamu všech uživatelů
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Aktualizace preferencí uživatele
    static async updatePreferences(req, res) {
        try {
            const user = await UserService.updatePreferences(req.params.username, req.body);
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Resetování preferencí uživatele na výchozí hodnoty
    static async resetPreferencesToDefault(req, res) {
        try {
            const user = await UserService.resetPreferencesToDefault(req.params.username);
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = UserController;
