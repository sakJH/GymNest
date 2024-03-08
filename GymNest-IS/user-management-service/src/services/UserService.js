const User = require('../models/User');

class UserService {
    static async createUser(userData) {
        const { username, password, email, roleId } = userData;
        try {
            return await User.createUser({ username, password, email, roleId });
        } catch (error) {
            console.error('Služba - Chyba při vytváření uživatele:', error);
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

    static async loginUser(username, password) {
        try {
            return await User.loginUser(username, password);
        } catch (error) {
            console.error('Služba - Chyba při přihlašování uživatele:', error);
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
}

module.exports = UserService;
