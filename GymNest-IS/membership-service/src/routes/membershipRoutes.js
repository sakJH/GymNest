const express = require('express');
const MembershipController = require('../controllers/MembershipController');

const router = express.Router();

// Vytvoření nového členství
/**
 * @swagger
 * /memberships:
 *   post:
 *     summary: Vytvoření nového členství
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membership'
 *     responses:
 *       201:
 *         description: Úspěšné vytvoření členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.post('/memberships', MembershipController.createMembership);

// Aktualizace členství podle ID
/**
 * @swagger
 * /memberships/{id}:
 *   put:
 *     summary: Aktualizace členství podle ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID členství
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membership'
 *     responses:
 *       200:
 *         description: Úspěšná aktualizace členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       400:
 *         description: Chybný formát požadavku
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.put('/memberships/:id', MembershipController.updateMembership);

// Získání členství podle ID
/**
 * @swagger
 * /memberships/{id}:
 *   get:
 *     summary: Získání členství podle ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID členství
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšné získání členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/:id', MembershipController.findMembershipById);

// Odstranění členství podle ID
/**
 * @swagger
 * /memberships/{id}:
 *   delete:
 *     summary: Odstranění členství podle ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID členství
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Úspěšné odstranění členství
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.delete('/memberships/:id', MembershipController.deleteMembership);

// Získání všech členství
/**
 * @swagger
 * /memberships:
 *   get:
 *     summary: Získání všech členství
 *     responses:
 *       200:
 *         description: Úspěšné získání všech členství
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships', MembershipController.findAllMemberships);

// Získání všech členství daného uživatele
/**
 * @swagger
 * /memberships/user/{userId}:
 *   get:
 *     summary: Získání všech členství daného uživatele
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID uživatele
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšné získání všech členství daného uživatele
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/user/:userId', MembershipController.findMembershipsByUserId);

module.exports = router;
