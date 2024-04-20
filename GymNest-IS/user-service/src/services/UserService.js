const User = require('../models/User');

class UserService {

    static async findUserByUsername(username) {
        try {
            return await User.findUserByUsername(username);
        } catch (error) {
            console.error('Služba - Chyba při hledání uživatele podle uživatelského jména:', error);
            throw error;
        }
    }

    static async findUserByEmail(email) {
        try {
            return await User.findUserByEmail(email);
        } catch (error) {
            console.error('Služba - Chyba při hledání uživatele podle emailu:', error);
            throw error;
        }
    }

    static async deleteUserByUsername(username) {
        try {
            return await User.deleteUserByUsername(username);
        } catch (error) {
            console.error('Služba - Chyba při odstraňování uživatele:', error);
            throw error;
        }
    }

    static async updateUserByUsername(username, updateValues) {
        try {
            return await User.updateUserByUsername(username, updateValues);
        } catch (error) {
            console.error('Služba - Chyba při aktualizaci uživatele:', error);
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await User.getAllUsers();
        } catch (error) {
            console.error('Služba - Chyba při získávání všech uživatelů:', error);
            throw error;
        }
    }

    static async updatePreferences(userId, preferences){
        try {
            return await User.updatePreferences(userId, preferences);
        } catch (error) {
            console.error('Služba - Chyba při aktualizaci preferencí uživatele:', error);
            throw error;
        }
    }

    static async resetPreferencesToDefault(username){
        try {
            return await User.resetPreferencesToDefault(username);
        } catch (error) {
            console.error('Služba - Chyba při resetování preferencí uživatele:', error);
            throw error;
        }
    }

    // Získání kreditů uživatele podle uživatelského jména
    static async getUserCredits(userId) {
        try {
            return await User.getCredits(userId);
        } catch (error) {
            console.error('Service error fetching user credits:', error);
            throw error;
        }
    }

    // Přidání kreditů uživateli
    static async addUserCredits(userId, amountToAdd) {
        try {
            return await User.addCredits(userId, amountToAdd);
        } catch (error) {
            console.error('Service error adding credits:', error);
            throw error;
        }
    }

    // Odebrání kreditů uživateli
    static async removeUserCredits(userId, amountToRemove) {
        try {
            return await User.removeCredits(userId, amountToRemove);
        } catch (error) {
            console.error('Service error removing credits:', error);
            throw error;
        }
    }

}

module.exports = UserService;
