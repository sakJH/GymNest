const router = require('express').Router();
const passport = require('passport');


// Přesměrování na Google pro autentizaci
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Přesměrování na Google pro autentizaci
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Přesměrování na Google pro autentizaci
 */
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

// Google callback po autentizaci
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google callback po autentizaci
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Přesměrování domů
 */
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Úspěšná autentizace, přesměrování domů.
        res.redirect('/');
    });

// Přesměrování na Google pro autentizaci
/**
 * @swagger
 * /google:
 *   get:
 *     summary: Přesměrování na Google pro autentizaci
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Přesměrování na Google pro autentizaci
 */
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
