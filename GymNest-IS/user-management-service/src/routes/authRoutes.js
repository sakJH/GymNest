const router = require('express').Router();
const passport = require('passport');


// Přesměrování na Google pro autentizaci
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

// Google callback po autentizaci
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Úspěšná autentizace, přesměrování domů.
        res.redirect('/');
    });

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
