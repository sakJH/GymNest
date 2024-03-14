const jwt = require('jsonwebtoken');

const secretKey = process.env.AUTH_SECRET; // Doporučuje se ukládat tajný klíč do environmentálních proměnných

// Generování JWT tokenu
function generateToken(user) {
    const payload = {
        sub: user.id, // ID uživatele jako subjekt tokenu
        username: user.username
        // Můžete přidat další claims podle potřeby
    };

    return jwt.sign(payload, secretKey, { expiresIn: '24h' }); // Token platný 24 hodin
}

// Ověřování JWT tokenu
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error('Chyba při ověřování tokenu:', error);
        return null;
    }
}

module.exports = { generateToken, verifyToken };
