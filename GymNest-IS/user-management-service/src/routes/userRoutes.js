const express = require('express');
const UserController = require('../controllers/UserController');
const passport = require('passport');
// Predpokladame existenci UserService
const UserService = require('../services/UserService');

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

// Získání uživatele podle uživatelského jména
router.get('/users/:username', UserController.getUserByUsername);

// Získání uživatele podle emailu
router.get('/users/email/:email', UserController.getUserByEmail);

// Aktualizace preferencí uživatele
router.put('/users/:userId/preferences', UserController.updatePreferences);

// Reset preferencí uživatele na výchozí hodnoty
router.put('/users/:userId/preferences/reset', UserController.resetPreferencesToDefault);

// Přístup k zabezpečenému obsahu
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedController.someMethod);

module.exports = router;
