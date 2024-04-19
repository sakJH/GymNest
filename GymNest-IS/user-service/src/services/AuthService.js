const Auth = require('../models/Auth');
const User = require('../models//User'); // Předpokládáme, že máme třídu User pro práci s uživatelskými daty

class AuthService {

    static async register(userData) {
        try {
            const { password, ...rest } = userData;
            const passwordHash = await Auth.hashPassword(password);
            const newUser = await User.create({ ...rest, passwordHash });
            const token = Auth.generateToken(newUser);
            const refreshToken = Auth.generateRefreshToken(newUser);
            return { newUser, token, refreshToken };
        } catch (error) {
            console.error('Služba - Error registering user in service:', error);
            throw new Error('Služba - Registration failed');
        }
    }

    static async login(username, password) {
        try {
            console.log('Username---:', username);
            const user = await User.findOne({ where: { username } });
            console.log('Username:', username);
            if (!user) throw new Error('Služba - User not found');

            const valid = await Auth.verifyPassword(password, user.passwordHash);
            if (!valid) throw new Error('Služba - Invalid credentials');

            const token = Auth.generateToken(user);
            const refreshToken = Auth.generateRefreshToken(user);
            return { user, token, refreshToken };
        } catch (error) {
            console.error('Služba - Error during login:', error);
            throw new Error('Služba - Login failed');
        }
    }

    static async refreshToken(refreshToken) {
        try {
            const userData = await Auth.verifyRefreshToken(refreshToken);
            if (!userData) throw new Error('Služba - Invalid refresh token');

            const user = await User.findByPk(userData.id);
            if (!user) throw new Error('User not found');

            const newToken = Auth.generateToken(user);
            return { user, token: newToken };
        } catch (error) {
            console.error('Služba - Error refreshing token:', error);
            throw new Error('Služba - Refresh token failed');
        }
    }

    static async validateToken(token) {
        console.log('Služba - Token:', token)
        try {
            return await Auth.verifyToken(token);
        } catch (error) {
            console.error('Služba - Token validation failed:', error);
            throw new Error('Služba - Invalid token');
        }
    }

    static async logout(username){
        try {
            return await Auth.logout(username);
        } catch (error) {
            console.error('Služba - Chyba při odhlašování uživatele:', error);
            throw error;
        }
    }
}

module.exports = AuthService;
