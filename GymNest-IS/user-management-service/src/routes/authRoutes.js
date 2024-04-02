const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Přesměrování na Google pro autentizaci
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect to Google for authentication
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback po autentizaci
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google callback po autentizaci
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to the specified URL after authentication
 */
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), AuthController.googleAuthCallback);

// Přihlášení uživatele
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Přihlášení uživatele
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Emailová adresa uživatele.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Heslo uživatele.
 *     responses:
 *       200:
 *         description: Úspěšné přihlášení.
 *       401:
 *         description: Neautorizovaný přístup.
 */
router.post('/auth/login', AuthController.login);

// Registrace uživatele
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrace nového uživatele
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Emailová adresa pro registraci.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Heslo pro registraci.
 *               name:
 *                 type: string
 *                 description: Jméno uživatele.
 *     responses:
 *       200:
 *         description: Úspěšná registrace.
 *       400:
 *         description: Chyba požadavku.
 */
router.post('/auth/register', AuthController.register);

// Zapomenuté heslo
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Žádost o reset zapomenutého hesla
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Emailová adresa uživatele pro reset hesla.
 *     responses:
 *       200:
 *         description: Email pro reset hesla byl odeslán.
 *       404:
 *         description: Uživatel s daným emailem nebyl nalezen.
 */
router.post('/auth/forgot-password', AuthController.forgotPassword);

// Reset hesla
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset hesla s použitím resetovacího tokenu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token pro reset hesla.
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: Nové heslo uživatele.
 *     responses:
 *       200:
 *         description: Heslo bylo úspěšně resetováno.
 *       400:
 *         description: Neplatný nebo vypršelý token.
 */
router.post('/auth/reset-password', AuthController.resetPassword);

// Změna hesla
/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Umožňuje uživateli změnit své heslo
 *     tags: [Auth]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 description: Současné heslo uživatele.
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: Nové heslo, které si uživatel přeje nastavit.
 *     responses:
 *       200:
 *         description: Heslo bylo úspěšně změněno.
 *       401:
 *         description: Neautorizovaný přístup.
 */
router.post('/auth/change-password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);

// Změna emailu
/**
 * @swagger
 * /auth/change-email:
 *   post:
 *     summary: Umožňuje uživateli změnit svou emailovou adresu
 *     tags: [Auth]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEmail:
 *                 type: string
 *                 format: email
 *                 description: Nová emailová adresa, kterou si uživatel přeje nastavit.
 *     responses:
 *       200:
 *         description: Emailová adresa byla úspěšně změněna.
 *       401:
 *         description: Neautorizovaný přístup.
 */
router.post('/auth/change-email', passport.authenticate('jwt', { session: false }), AuthController.changeEmail);

// Změna uživatelského jména
/**
 * @swagger
 * /auth/change-username:
 *   post:
 *     summary: Umožňuje uživateli změnit své uživatelské jméno
 *     tags: [Auth]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newUsername:
 *                 type: string
 *                 description: Nové uživatelské jméno, které si uživatel přeje nastavit.
 *     responses:
 *       200:
 *         description: Uživatelské jméno bylo úspěšně změněno.
 *       401:
 *         description: Neautorizovaný přístup.
 */
router.post('/auth/change-username', passport.authenticate('jwt', { session: false }), AuthController.changeUsername);

// Odhlášení
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Odhlásí uživatele z aplikace
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně odhlášen.
 */
router.get('/auth/logout', AuthController.logout);

// Obnovení tokenu
/**
 * @swagger
 * /auth/refresh-token:
 *   get:
 *     summary: Obnoví JWT token uživatele
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token byl úspěšně obnoven.
 *       401:
 *         description: Neautorizovaný přístup.
 */
router.get('/auth/refresh-token', AuthController.refreshToken);

// Ověření emailu
/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Ověří email uživatele
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Email byl úspěšně ověřen.
 *       404:
 *         description: Uživatel s daným emailem nebyl nalezen.
 */
router.get('/auth/verify-email', AuthController.verifyEmail);

// Ověření uživatelského jména
/**
 * @swagger
 * /auth/verify-username:
 *   get:
 *     summary: Ověří, zda je uživatelské jméno dostupné
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Uživatelské jméno je dostupné.
 *       409:
 *         description: Uživatelské jméno již existuje.
 */
router.get('/auth/verify-username', AuthController.verifyUsername);

// Ověření hesla
/**
 * @swagger
 * /auth/verify-password:
 *   get:
 *     summary: Ověří, zda je heslo správné
 *     tags: [Auth]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Heslo je správné.
 *       401:
 *         description: Neautorizovaný přístup nebo nesprávné heslo.
 */
router.get('/auth/verify-password', passport.authenticate('jwt', { session: false }), AuthController.verifyPassword);

module.exports = router;
