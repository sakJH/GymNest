const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Redirect na Google pro autentizaci
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: "Redirect na Google pro autentizaci"
 *     tags: [Auth]
 *     description: "Uživatel je přesměrován na Google pro autentizaci přes OAuth."
 *     responses:
 *       302:
 *         description: "Přesměrování na stránku Google pro autentizaci."
 */
router.post('/auth/google', AuthController.googleAuthenticate);

// Google callback URL, který obdrží data po přesměrování
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: "Google callback URL"
 *     tags: [Auth]
 *     description: "Endpoint zpracuje callback od Google po uživatelově autentizaci."
 *     responses:
 *       200:
 *         description: "Uživatel byl úspěšně autentizován."
 *       401:
 *         description: "Autentizace selhala."
 */
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/googleError' }),
);

// Route pro registraci uživatele
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: "Registrace nového uživatele"
 *     tags: [Auth]
 *     description: "Registruje nového uživatele a vrací přístupový token a token pro obnovu."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Uživatel byl úspěšně zaregistrován."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: "Chybný formát požadavku."
 *       500:
 *         description: "Interní chyba serveru při registraci."
 */
router.post('/auth/register', AuthController.register);

// Route pro přihlášení uživatele
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: "Přihlášení uživatele"
 *     tags: [Auth]
 *     description: "Přihlásí uživatele a vrací přístupový token a token pro obnovu."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Uživatel byl úspěšně přihlášen."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully logged in"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: "Neplatné přihlašovací údaje."
 *       500:
 *         description: "Interní chyba serveru při přihlašování."
 */
router.post('/auth/login', AuthController.login);

// Route pro obnovení přístupového tokenu
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: "Obnovení přístupového tokenu"
 *     description: "Přijímá obnovovací token a vrací nový přístupový token a uživatelské údaje."
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Token byl úspěšně obnoven"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token successfully refreshed"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         description: "Neplatný obnovovací token"
 *       500:
 *         description: "Serverová chyba při obnově tokenu"
 */
router.post('/auth/refresh-token', AuthController.refreshToken);

// Route pro validaci přístupového tokenu
/**
 * @swagger
 * /auth/validate-token:
 *   post:
 *     summary: "Validace přístupového tokenu"
 *     description: "Přijímá přístupový token a ověřuje jeho platnost."
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Token je platný"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is valid"
 *                 decoded:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     iat:
 *                       type: integer
 *                     exp:
 *                       type: integer
 *       401:
 *         description: "Neplatný token"
 *       500:
 *         description: "Serverová chyba při validaci tokenu"
 */
router.post('/auth/validate-token', AuthController.validateToken);

// Route pro validaci Google ID tokenu
/**
 * @swagger
 * /auth/validate-google-token:
 *   post:
 *     summary: "Validace Google ID tokenu"
 *     description: "Přijímá Google ID token a ověřuje jeho platnost."
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Token je platný"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is valid"
 *                 decoded:
 *                   type: object
 *                   properties:
 *                     sub:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     picture:
 *                       type: string
 *       401:
 *         description: "Neplatný token"
 *       500:
 *         description: "Serverová chyba při validaci tokenu"
 */
router.post('/auth/validate-google-token', AuthController.validateGoogleToken);

// Odhlášení uživatele
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Odhlášení uživatele
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Uživatel byl úspěšně odhlášen
 */
router.get('/auth/logout', AuthController.logout);

module.exports = router;
