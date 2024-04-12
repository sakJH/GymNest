const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const passport = require('passport');

/**
 *
 * Google autentizaci a její callback
 * Přihlášení uživatele pomocí emailu a hesla
 * Registraci uživatele s emailovou adresou, heslem a jménem
 * Zapomenuté heslo a jeho reset
 * Změnu hesla, emailu a uživatelského jména
 * Odhlášení uživatele
 */

class AuthController {
    static async googleAuthCallback(req, res) {
        // Přesměrování uživatele po úspěšné autentizaci pomocí Google
        res.redirect('/');
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Uživatel nenalezen' });
            }
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Nesprávné heslo' });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
            res.json({ token: `Bearer ${token}` });
        } catch (error) {
            res.status(500).json({ message: 'Došlo k chybě při přihlašování' });
        }
    }

    static async register(req, res) {
        const { email, password, name } = req.body;
        try {
            let user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'Uživatel s tímto emailem již existuje' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.createUser({ email, passwordHash: hashedPassword, name });
            res.status(201).json({ message: 'Uživatel byl úspěšně vytvořen' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Došlo k chybě při registraci', error: error.message });
        }
    }

    static async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Uživatel s tímto emailem nebyl nalezen.' });
            }

            // Generování a uložení resetovacího tokenu - záleží na implementaci
            const resetToken = "some-generated-token"; // Tuto část je potřeba implementovat

            // Odeslání emailu s resetovacím odkazem - záleží na implementaci
            // Příklad: await sendResetPasswordEmail(email, resetToken);

            res.json({ message: 'Instrukce pro reset hesla byly odeslány na email.' });
        } catch (error) {
            res.status(500).json({ message: 'Při zpracování požadavku došlo k chybě.' });
        }
    }

    static async resetPassword(req, res) {
        const { token, newPassword } = req.body;
        try {
            // Verifikace tokenu a zjištění uživatele - záleží na implementaci
            const userId = "id-z-tokenu"; // Tuto část je potřeba implementovat

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Uživatel nebyl nalezen.' });
            }

            user.passwordHash = await bcrypt.hash(newPassword, 10);
            await user.save();

            res.json({ message: 'Heslo bylo úspěšně resetováno.' });
        } catch (error) {
            res.status(500).json({ message: 'Při resetování hesla došlo k chybě.' });
        }
    }

    static async changePassword(req, res) {
        const { oldPassword, newPassword } = req.body;
        const user = req.user; // Uživatel získaný z passport JWT strategie

        try {
            const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Aktuální heslo je nesprávné.' });
            }

            user.passwordHash = await bcrypt.hash(newPassword, 10);
            await user.save();

            res.json({ message: 'Heslo bylo úspěšně změněno.' });
        } catch (error) {
            res.status(500).json({ message: 'Při změně hesla došlo k chybě.' });
        }
    }

    static logout(req, res) {
        req.logout();
        res.json({ message: 'Byli jste úspěšně odhlášeni' });
    }

    static async changeEmail(req, res) {
        const { newEmail } = req.body;
        const user = req.user; // Uživatel získaný z passport JWT strategie

        try {
            const existingUser = await User.findOne({ where: { email: newEmail } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tento email již používá jiný uživatel.' });
            }

            user.email = newEmail;
            await user.save();

            res.json({ message: 'Email byl úspěšně změněn.' });
        } catch (error) {
            res.status(500).json({ message: 'Při změně emailu došlo k chybě.' });
        }
    }

    static async changeUsername(req, res) {
        const { newUsername } = req.body;
        const user = req.user; // Uživatel získaný z passport JWT strategie

        try {
            const existingUser = await User.findOne({ where: { username: newUsername } });
            if (existingUser) {
                return res.status(400).json({ message: 'Toto uživatelské jméno již používá jiný uživatel.' });
            }

            user.username = newUsername;
            await user.save();

            res.json({ message: 'Uživatelské jméno bylo úspěšně změněno.' });
        } catch (error) {
            res.status(500).json({ message: 'Při změně uživatelského jména došlo k chybě.' });
        }
    }

    static async refreshToken(req, res) {
        //TODO Implementovat obnovu tokenu; Nutno vytvořit obnovovací token
        res.status(501).json({ message: 'Metoda není implementována.' });
        /**
         * const { refreshToken } = req.body; // Předpokládáme, že refresh token je posílán v těle požadavku
         *
         *         if (!refreshToken) {
         *             return res.status(400).json({ message: 'Refresh token je vyžadován.' });
         *         }
         *
         *         try {
         *             // Verifikace refresh tokenu
         *             const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
         *             const userId = decoded.id; // Předpokládáme, že ID uživatele je zakódováno v payloadu tokenu
         *
         *             const user = await User.findByPk(userId);
         *             if (!user) {
         *                 return res.status(404).json({ message: 'Uživatel nebyl nalezen.' });
         *             }
         *
         *             // Generování nového access tokenu
         *             const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Nastavení expirace na 1 hodinu
         *
         *             // Odeslání nového access tokenu klientovi
         *             res.json({ accessToken: newAccessToken });
         *         } catch (error) {
         *             if (error.name === 'TokenExpiredError') {
         *                 return res.status(401).json({ message: 'Refresh token expiroval. Přihlaste se znovu.' });
         *             } else {
         *                 return res.status(500).json({ message: 'Při obnově tokenu došlo k chybě.' });
         *             }
         *         }
         */
    }

    static async verifyEmail(req, res) {
        const { email } = req.query;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Uživatel s tímto emailem nebyl nalezen.' });
            }
            // Implementace ověření emailu...
            res.json({ message: 'Email je ověřen.' });
        } catch (error) {
            res.status(500).json({ message: 'Při ověřování emailu došlo k chybě.' });
        }
    }

    static async verifyUsername(req, res) {
        const { username } = req.query;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'Uživatel s tímto uživatelským jménem nebyl nalezen.' });
            }
            // Implementace ověření uživatelského jména...
            res.json({ message: 'Uživatelské jméno je ověřeno.' });
        } catch (error) {
            res.status(500).json({ message: 'Při ověřování uživatelského jména došlo k chybě.' });
        }
    }

    static async verifyPassword(req, res) {
        const { password } = req.body;
        const user = req.user; // Uživatel získaný z passport JWT strategie

        try {
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Heslo je nesprávné.' });
            }
            // Implementace ověření hesla...
            res.json({ message: 'Heslo je ověřeno.' });
        } catch (error) {
            res.status(500).json({ message: 'Při ověřování hesla došlo k chybě.' });
        }
    }
}

module.exports = AuthController;