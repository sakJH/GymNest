const UserService = require('../services/UserService');
const express = require('express');

class UserController {

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

    // Handler pro získání kreditů uživatele
    static async getUserCredits(req, res) {
        try {
            const userId = req.params.userId;
            const credits = await UserService.getUserCredits(userId);
            res.json({ userId, credits });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Handler pro přidání kreditů uživateli
    static async addUserCredits(req, res) {
        try {
            const userId = req.params.userId;
            const amountToAdd = req.body.amount;
            const user = await UserService.addUserCredits(userId, amountToAdd);
            res.json({ message: 'Credits added successfully', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Handler pro odebrání kreditů uživateli
    static async removeUserCredits(req, res) {
        try {
            const userId = req.params.userId;
            const amountToRemove = req.body.amount;
            const user = await UserService.removeUserCredits(userId, amountToRemove);
            res.json({ message: 'Credits removed successfully', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = UserController;
