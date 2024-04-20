const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const Auth = require('../models/Auth');

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

    // Metoda pro ověření Google tokenu a registraci/přihlášení uživatele
    static async validateGoogleToken(req, res) {
        try {
            const idToken = req.body.idToken;
            if (!idToken) {
                return res.status(400).json({ error: 'Google ID token is required.' });
            }

            const userData = await AuthService.validateGoogleToken(idToken);

            if (!userData) {
                return res.status(401).json({ error: 'Invalid Google token' });
            }

            // Zjištění, zda uživatel existuje v databázi
            let user = await UserService.findUserByEmail(userData.email);

            if (user) {
                // Uživatel existuje, přihlášení
                const token = Auth.generateToken(user);
                const refreshToken = Auth.generateRefreshToken(user);
                return res.status(200).json({
                    message: 'User successfully logged in.',
                    token,
                    refreshToken,
                    user
                });
            } else {
                // Uživatel neexistuje, registrace
                const newUser = {
                    username: userData.email,
                    email: userData.email,
                    passwordHash: null, // Google přihlášení nemá heslo
                };

                user = await AuthService.register(newUser);

                const token = Auth.generateToken(user);
                const refreshToken = Auth.generateRefreshToken(user);
                return res.status(201).json({
                    message: 'User successfully registered and logged in.',
                    token,
                    refreshToken,
                    user
                });
            }
        } catch (error) {
            console.error('Controller - Error validating Google token:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
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
