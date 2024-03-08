const express = require('express');
const ProfileController = require('../controllers/ProfileController');

const router = express.Router();

// Získání profilu uživatele podle userId
router.get('/profiles/:userId', ProfileController.getProfile);

// Vytvoření nového profilu
router.post('/profiles', ProfileController.createProfile);

// Aktualizace profilu uživatele podle userId
router.put('/profiles/:userId', ProfileController.updateProfile);

// Odstranění profilu uživatele podle userId
router.delete('/profiles/:userId', ProfileController.deleteProfile);

module.exports = router;
