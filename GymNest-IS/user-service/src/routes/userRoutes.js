const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Odstranění uživatele podle uživatelského jména
/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     summary: Odstranění uživatele podle uživatelského jména
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           membershipType: string
 *         required: true
 *         description: Uživatelské jméno uživatele pro odstranění
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně odstraněn
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.delete('/users/:username', UserController.deleteUserByUsername);

// Aktualizace uživatele podle uživatelského jména
/**
 * @swagger
 * /users/{username}:
 *   put:
 *     summary: Aktualizace uživatele podle uživatelského jména
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           membershipType: string
 *         required: true
 *         description: Uživatelské jméno uživatele pro aktualizaci
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně aktualizován
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.put('/users/:username', UserController.updateUserByUsername);

// Získání všech uživatelů uživatele
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Získání všech uživatelů
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Seznam všech uživatelů
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users/all', UserController.getAllUsers);

// Aktualizace preferencí podle ID
/**
 * @swagger
 * /users/{userId}/preferences:
 *   put:
 *     summary: Aktualizace preferencí uživatele
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           membershipType: integer
 *         required: true
 *         description: ID uživatele pro aktualizaci preferencí
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Preferences'
 *     responses:
 *       200:
 *         description: Preference uživatele byly úspěšně aktualizovány
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.put('/users/:userId/preferences', UserController.updatePreferences);

// Reset preferencí uživatele na výchozí hodnoty
/**
 * @swagger
 * /users/{userId}/preferences/reset:
 *   put:
 *     summary: Reset preferencí uživatele na výchozí hodnoty
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           membershipType: integer
 *         required: true
 *         description: ID uživatele pro reset preferencí
 *     responses:
 *       200:
 *         description: Preference uživatele byly úspěšně resetovány
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.put('/users/:userId/preferences/reset', UserController.resetPreferencesToDefault);

// Route pro získání kreditů uživatele podle userId
/**
 * @swagger
 * /users/{userId}/credits:
 *   get:
 *     summary: Získání kreditů uživatele
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           membershipType: integer
 *         required: true
 *         description: ID uživatele pro získání kreditů
 *     responses:
 *       200:
 *         description: Kredity uživatele
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: integer
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.get('/users/:userId/credits', UserController.getUserCredits);

// Route pro přidání kreditů uživateli podle userId
/**
 * @swagger
 * /users/{userId}/credits/add:
 *   post:
 *     summary: Přidání kreditů uživateli
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           membershipType: integer
 *         required: true
 *         description: ID uživatele pro přidání kreditů
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credits:
 *                 membershipType: integer
 *                 description: Počet kreditů k přidání
 *     responses:
 *       200:
 *         description: Kredity byly úspěšně přidány
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.post('/users/:userId/credits/add', UserController.addUserCredits);

// Route pro odebrání kreditů uživateli podle userId
/**
 * @swagger
 * /users/{userId}/credits/remove:
 *   post:
 *     summary: Odebrání kreditů uživateli
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           membershipType: integer
 *         required: true
 *         description: ID uživatele pro odebrání kreditů
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credits:
 *                 membershipType: integer
 *                 description: Počet kreditů k odebrání
 *     responses:
 *       200:
 *         description: Kredity byly úspěšně odebrány
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.post('/users/:userId/credits/remove', UserController.removeUserCredits);

module.exports = router;
