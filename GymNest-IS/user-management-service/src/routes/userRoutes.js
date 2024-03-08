const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Vytvoření nového uživatele
router.post('/users', UserController.createUser);

// Získání uživatele podle uživatelského jména
router.get('/users/:username', UserController.findUserByUsername);

// Odstranění uživatele podle uživatelského jména
router.delete('/users/:username', UserController.deleteUserByUsername);

// Aktualizace uživatele podle uživatelského jména
router.put('/users/:username', UserController.updateUserByUsername);

// Přihlášení uživatele
router.post('/users/login', UserController.loginUser);

// Získání všech uživatelů
router.get('/users', UserController.getAllUsers);

module.exports = router;
