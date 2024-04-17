const User = require('../models/User');

class UserService {
    static async createUser(userData) {
        const { username, password, email, roleId } = userData;
        const passwordHash = await bcrypt.hash(password, 10);  // Předpokládáme, že používáte bcrypt pro hashování hesla
        try {
            return await User.createUser({ username, passwordHash, email, roleId });
        } catch (error) {
            console.error('Service - Error creating user:', error);
            throw error;
        }
    }

    static async loginUser(username, password) {
        try {
            return await User.loginUser(username, password);
        } catch (error) {
            console.error('Služba - Chyba při přihlašování uživatele:', error);
            throw error;
        }
    }

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

    static async getUserByUsername(username){
        try {
            return await User.getUserByUsername(username);
        } catch (error) {
            console.error('Služba - Chyba při získávání uživatele dle jména:', error);
            throw error;
        }
    }

    static async getUserByEmail(email){
        try {
            return await User.getUserByEmail(email);
        } catch (error) {
            console.error('Služba - Chyba při získávání uživatele dle emailu:', error);
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

    static async logoutUser(username){
        try {
            return await User.logoutUser(username);
        } catch (error) {
            console.error('Služba - Chyba při odhlašování uživatele:', error);
            throw error;
        }
    }

}

module.exports = UserService;
