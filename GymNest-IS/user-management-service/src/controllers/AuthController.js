const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async (req, res) => {
    // Získání uživatele (předpokládáme, že je již autentizován)
    const user = req.user; // Nebo získat uživatele z databáze podle potřeby

    // Generování JWT tokenu
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Odeslání tokenu klientovi
    res.json({ success: true, token: 'Bearer ' + token });
};
