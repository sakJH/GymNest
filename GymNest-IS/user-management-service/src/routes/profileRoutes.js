const express = require('express');
const ProfileController = require('../controllers/ProfileController');

const router = express.Router();

// Získání profilu uživatele podle userId
/**
 * @swagger
 * /profiles/{userId}:
 *   get:
 *     summary: Získání profilu uživatele podle userId
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID uživatele pro získání profilu
 *     responses:
 *       200:
 *         description: Profil byl úspěšně získán
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profil nebyl nalezen
 */
router.get('/profiles/:userId', ProfileController.getProfile);

// Vytvoření nového profilu
/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Vytvoření nového profilu
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Profil byl úspěšně vytvořen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Neplatný požadavek
 */
router.post('/profiles', ProfileController.createProfile);

// Aktualizace profilu uživatele podle userId
/**
 * @swagger
 * /profiles/{userId}:
 *   put:
 *     summary: Aktualizace profilu uživatele
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID uživatele pro aktualizaci profilu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profil byl úspěšně aktualizován
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Neplatný požadavek
 *       404:
 *         description: Profil nebyl nalezen
 */
router.put('/profiles/:userId', ProfileController.updateProfile);

// Odstranění profilu uživatele podle userId
/**
 * @swagger
 * /profiles/{userId}:
 *   delete:
 *     summary: Odstranění profilu uživatele
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID uživatele pro odstranění profilu
 *     responses:
 *       200:
 *         description: Profil byl úspěšně odstraněn
 *       404:
 *         description: Profil nebyl nalezen
 */
router.delete('/profiles/:userId', ProfileController.deleteProfile);

module.exports = router;
