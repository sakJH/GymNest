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

    static async updatePreferences(username, preferences){
        try {
            return await User.updatePreferences(username, preferences);
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

}

module.exports = UserService;
