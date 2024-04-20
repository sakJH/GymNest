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
        console.log('Starting verification of Google token');
        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userId = payload['sub'];

            console.log(`Looking up user with Google ID: ${userId}`);
            let user = await User.findUserByGoogleId(userId);
            if (!user) {
                console.log('No user found, creating new user');
                user = await User.create({
                    googleId: userId,
                    username: payload['email'].split('@')[0],
                    email: payload['email'],
                    firstName: payload['given_name'],
                    lastName: payload['family_name'],
                });
                console.log('New user created');
            } else {
                console.log('User found');
            }

            console.log('Google token verified successfully');
            return { user, payload };
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