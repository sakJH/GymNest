const express = require('express');
const MembershipController = require('../controllers/MembershipController');
const MembershipService = require('../services/MembershipService');

const router = express.Router();

// Vytvoření nového členství pro uživatele
/**
 * @swagger
 * /memberships:
 *   post:
 *     summary: Vytvoření nového členství pro uživatele
 *     tags: [Memberships]
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
router.post('/memberships/create', MembershipController.createMembership);

// Aktualizace členství podle ID
/**
 * @swagger
 * /memberships/{id}:
 *   put:
 *     summary: Aktualizace členství podle ID
 *     tags: [Memberships]
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
router.put('/memberships/update/:id', MembershipController.updateMembership);

// Získání členství podle ID
/**
 * @swagger
 * /memberships/{id}:
 *   get:
 *     summary: Získání členství podle ID
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID členství
 *         schema:
 *           membershipType: integer
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
router.get('/memberships/get/:id', MembershipController.findMembershipById);

// Odstranění členství podle ID
/**
 * @swagger
 * /memberships/{id}:
 *   delete:
 *     summary: Odstranění členství podle ID
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID členství
 *         schema:
 *           membershipType: integer
 *     responses:
 *       204:
 *         description: Úspěšné odstranění členství
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.delete('/memberships/delete/:id', MembershipController.deleteMembership);

// Získání všech členství
/**
 * @swagger
 * /memberships:
 *   get:
 *     summary: Získání všech členství
 *     tags: [Memberships]
 *     responses:
 *       200:
 *         description: Úspěšné získání všech členství
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/all', MembershipController.findAllMemberships);

// Získání všech členství daného uživatele
/**
 * @swagger
 * /memberships/user/{userId}:
 *   get:
 *     summary: Získání všech členství daného uživatele
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID uživatele
 *         schema:
 *           membershipType: integer
 *     responses:
 *       200:
 *         description: Úspěšné získání všech členství daného uživatele
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/user/:userId', MembershipController.findMembershipsByUserId);

//Získání všech aktivních členství
/**
 * @swagger
 * /memberships/active:
 *   get:
 *     summary: Získání všech aktivních členství
 *     tags: [Memberships]
 *     responses:
 *       200:
 *         description: Úspěšné získání všech aktivních členství
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/active', MembershipController.findActive);

// Nalezení všech dle typu členství
/**
 * @swagger
 * /memberships/findtype/{type}:
 *   get:
 *     summary: Nalezení všech dle typu členství
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Typ členství
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Úspěšné nalezení všech dle typu členství
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/findtype/:type', MembershipController.findByType);

// Nalezení všech dle statusu členství
/**
 * @swagger
 * /memberships/status/{status}:
 *   get:
 *     summary: Nalezení všech dle statusu členství
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Status členství
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Úspěšné nalezení všech dle statusu členství
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/status/:status', MembershipController.findByStatus);

// Nalezení všech členství, které brzy vyprší
/**
 * @swagger
 * /memberships/expiring:
 *   get:
 *     summary: Nalezení všech členství, které brzy vyprší
 *     tags: [Memberships]
 *     parameters:
 *       - in: query
 *         name: days
 *         required: true
 *         description: Počet dní do expirace členství
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšné nalezení všech členství, které brzy vyprší
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       500:
 *         description: Chyba serveru
 */
router.get('/memberships/expiring', MembershipController.findExpiringSoon);

// Změna typu členství dle id s parametrem typy členství
/**
 * @swagger
 * /memberships/changeType/{id}:
 *   put:
 *     summary: Změna typu členství dle id s parametrem typy členství
 *     tags: [Memberships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID členství
 *         schema:
 *           membershipType: integer
 *       - in: query
 *         name: type
 *         required: true
 *         description: Typ členství
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Úspěšná změna typu členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.put('/memberships/changeType/:id', MembershipController.changeMembershipType);


module.exports = router;
