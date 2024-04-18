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
            console.error('Error registering user in service:', error);
            throw new Error('Registration failed');
        }
    }

    static async login(username, password) {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) throw new Error('User not found');

            const valid = await Auth.verifyPassword(password, user.passwordHash);
            if (!valid) throw new Error('Invalid credentials');

            const token = Auth.generateToken(user);
            const refreshToken = Auth.generateRefreshToken(user);
            return { user, token, refreshToken };
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Login failed');
        }
    }

    static async refreshToken(refreshToken) {
        try {
            const userData = await Auth.verifyRefreshToken(refreshToken);
            if (!userData) throw new Error('Invalid refresh token');

            const user = await User.findByPk(userData.id);
            if (!user) throw new Error('User not found');

            const newToken = Auth.generateToken(user);
            return { user, token: newToken };
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw new Error('Refresh token failed');
        }
    }

    static async validateToken(token) {
        try {
            return await Auth.verifyToken(token);
        } catch (error) {
            console.error('Token validation failed:', error);
            throw new Error('Invalid token');
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
