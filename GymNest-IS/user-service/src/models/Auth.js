const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Import bcrypt
const { sign, verify } = require("jsonwebtoken");

class Auth extends Model {
    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    static async verifyPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }

    static generateToken(user) {
        return sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    }

    static generateRefreshToken(user) {
        return sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2h' });
    }

    static async verifyToken(token) {
        try {
            return verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.log('Error verifying token:', error)
            return null; // Token není platný
        }
    }

    static async verifyRefreshToken(refreshToken) {
        try {
            return verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            console.log('Error verifying refresh token:', error)
            return null; // Refresh token není platný
        }
    }

    // Metoda pro odhlášení uživatele
    static async logout(userId) {
        try {
            const user = await this.findByPk(userId);
            if (!user) {
                throw new Error('Uživatel nebyl nalezen.');
            }
            console.log(`Uživatel s ID "${userId}" byl odhlášen.`);
            return user;
        } catch (error) {
            console.error('Chyba při odhlášení uživatele:', error);
            throw error;
        }
    }
}

module.exports = Auth;