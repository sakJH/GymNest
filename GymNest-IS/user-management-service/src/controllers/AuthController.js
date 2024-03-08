const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    // Logika pro registraci uživatele
};

exports.login = (req, res) => {
    const user = req.user;
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '1h' }); // Opět použijte bezpečný klíč

    res.json({ token: `Bearer ${token}` });
};
