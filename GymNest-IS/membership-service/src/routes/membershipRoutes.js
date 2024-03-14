const express = require('express');
const MembershipController = require('../controllers/MembershipController');

const router = express.Router();

// Vytvoření nového členství
router.post('/memberships', MembershipController.createMembership);

// Aktualizace členství podle ID
router.put('/memberships/:id', MembershipController.updateMembership);

// Získání členství podle ID
router.get('/memberships/:id', MembershipController.findMembershipById);

// Odstranění členství podle ID
router.delete('/memberships/:id', MembershipController.deleteMembership);

// Získání všech členství
router.get('/memberships', MembershipController.findAllMemberships);

// Získání všech členství daného uživatele
router.get('/memberships/user/:userId', MembershipController.findMembershipsByUserId);

module.exports = router;
