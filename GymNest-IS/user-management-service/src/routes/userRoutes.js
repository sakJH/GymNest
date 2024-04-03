const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

/**
 * Vytvoření uživatele
 * Odstanění uživatele podle uživatelského jména
 * Aktualizace uživatele podle uživatelského jména
 * Přihlášení uživatele
 * Odhlášení uživatele
 * Získání všech uživatelů
 * Získání uživatele podle uživatelského jména
 * Získání uživatele podle emailu
 * Aktualizace preferencí podle ID
 * Reset preferencí uživatele na výchozí hodnoty
 */

// Vytvoření uživatele
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Vytvoření nového uživatele
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně vytvořen
 *       500:
 *         description: Došlo k chybě na serveru
 */
router.post('/users/create', UserController.createUser);

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
 *           type: string
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
 *           type: string
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

// Přihlášení uživatele
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Přihlášení uživatele
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně přihlášen
 *       401:
 *         description: Neplatné přihlašovací údaje
 */
router.post('/users/login', UserController.loginUser);

// Odhlášení uživatele
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users/logout', UserController.getAllUsers);

// Získání uživatele podle uživatelského jména - TODO: ano/ne?
/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Získání uživatele podle uživatelského jména
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Uživatelské jméno uživatele pro získání
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně získán
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Uživatel nebyl nalezen
 */
//router.get('/users/:username', UserController.getUserByUsername);

// Získání uživatele podle emailu
/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Získání uživatele podle emailu
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email uživatele pro získání
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně získán
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.get('/users/email/:email', UserController.getUserByEmail);

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
 *           type: integer
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
 *           type: integer
 *         required: true
 *         description: ID uživatele pro reset preferencí
 *     responses:
 *       200:
 *         description: Preference uživatele byly úspěšně resetovány
 *       404:
 *         description: Uživatel nebyl nalezen
 */
router.put('/users/:userId/preferences/reset', UserController.resetPreferencesToDefault);

module.exports = router;
