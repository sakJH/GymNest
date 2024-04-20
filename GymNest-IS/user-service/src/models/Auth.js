const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Import bcrypt
const { sign, verify } = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('./User');

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

    static async verifyGoogleToken(idToken) {
        console.log('Verifying 1st Google token:', idToken)
        try {
            console.log('Verifying 2nd Google token:', idToken)
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userId = payload['sub'];  // Google's user ID
            // uživatel existuje ve vaší databázi?
            let user = await User.findOne({ where: { googleId: userId } });
            if (!user) {
                // Pokud uživatel neexistuje, vytvoří nový záznam
                user = await User.create({
                    googleId: userId,
                    email: payload['email'],
                    name: payload['name']
                });
            }
            console.log('Verifying 3rd Google token:', idToken)
            return { user, payload };  // Vracíme objekt s uživatelem a payloadem
        } catch (error) {
            console.error('Error verifying Google token:', error);
            throw new Error('Failed to verify Google token');
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