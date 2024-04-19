const AuthService = require('../services/AuthService');

class AuthController {

    // Přesměrování na Google pro autentizaci
    static async googleAuthCallback(req, res) {
        // Přesměrování uživatele po úspěšné autentizaci pomocí Google
        res.redirect('/');
    }

    static async register(req, res) {
        try {
            const userData = req.body;
            const { newUser, token, refreshToken } = await AuthService.register(userData);
            res.status(201).json({
                message: 'User successfully registered',
                user: newUser,
                token,
                refreshToken
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Failed to register user'
            });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const { user, token, refreshToken } = await AuthService.login(username, password);
            res.status(200).json({
                message: 'User successfully logged in',
                user,
                token,
                refreshToken
            });
        } catch (error) {
            res.status(401).json({
                message: error.message || 'Login failed'
            });
        }
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const { user, token } = await AuthService.refreshToken(refreshToken);
            res.status(200).json({
                message: 'Token successfully refreshed',
                user,
                token
            });
        } catch (error) {
            res.status(401).json({
                message: error.message || 'Failed to refresh token'
            });
        }
    }

    static async validateToken(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new Error('No token provided');
            }
            const token = authHeader.split(' ')[1];
            const decoded = await AuthService.validateToken(token);
            if (decoded) {
                res.status(200).json({
                    message: 'Token is valid',
                    decoded
                });
            } else {
                throw new Error('Invalid token');
            }
        } catch (error) {
            res.status(401).json({
                message: error.message || 'Invalid token'
            });
        }
    }

    // Odhlášení uživatele
    static async logout(req, res) {
        try {
            req.logout(); // Předpokládáme, že používáte passport.js
            res.status(200).json({ message: 'User successfully logged out' });
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Failed to log out user' });
        }
    }
}

module.exports = AuthController;
