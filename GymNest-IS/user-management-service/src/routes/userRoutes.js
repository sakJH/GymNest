const express = require('express');
const UserController = require('../controllers/UserController');

const passport = require('passport'); // Nezapomeňte na import Passport
const protectedController = require('../controllers/AuthController'); // Předpokládáme, že máte nějaký kontrolér pro ochranné metody


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

// TODO - bezpečná auth
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedController.someMethod);

module.exports = router;
