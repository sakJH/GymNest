const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// Vytvoření nové platby
/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Vytvoření nové platby
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Úspěšné vytvoření platby
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.post('/payments/create', PaymentController.createPayment);

// Aktualizace stavu platby
/**
 * @swagger
 * /payments/status:
 *   put:
 *     summary: Aktualizace stavu platby
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentStatus'
 *     responses:
 *       200:
 *         description: Úspěšná aktualizace stavu platby
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Chybný formát požadavku
 *       404:
 *         description: Platba nebyla nalezena
 *       500:
 *         description: Chyba serveru
 */
router.put('/payments/status', PaymentController.updatePaymentStatus);

// Získání plateb podle ID předplatného
/**
 * @swagger
 * /payments/subscription/{subscriptionId}:
 *   get:
 *     summary: Získání plateb podle ID předplatného
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         description: ID předplatného
 *         schema:
 *           membershipType: integer
 *     responses:
 *       200:
 *         description: Seznam plateb
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Předplatné nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.get('/payments/subscription/:subscriptionId', PaymentController.findPaymentsBySubscriptionId);

// Zpracování vrácení peněz
/**
 * @swagger
 * /payments/{paymentId}/refund:
 *   post:
 *     summary: Zpracování vrácení peněz
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: ID platby
 *         schema:
 *           membershipType: integer
 *     responses:
 *       200:
 *         description: Úspěšné vrácení peněz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Chybný formát požadavku
 *       404:
 *         description: Platba nebyla nalezena
 *       500:
 *         description: Chyba serveru
 */
router.post('/payments/:paymentId/refund', PaymentController.processRefund);

// Vyhledání plateb podle stavu
/**
 * @swagger
 * /payments/status/{status}:
 *   get:
 *     summary: Vyhledání plateb podle stavu
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Stav platby
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Seznam plateb
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/payments/status/:status', PaymentController.findPaymentsByStatus);

// Vyhledání plateb podle ID uživatele
/**
 * @swagger
 * /payments/all/{userId}:
 *   get:
 *     summary: Vyhledání plateb podle ID uživatele
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID uživatele
 *         schema:
 *           membershipType: integer
 *     responses:
 *       200:
 *         description: Seznam plateb
 *         content:
 *           application/json:
 *             schema:
 *               membershipType: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/payments/all/:userId', PaymentController.findPaymentsByUserId);

// Pozastavení členství podle ID
/**
 * @swagger
 * /memberships/pause/{id}:
 *   put:
 *     summary: Pozastavení členství podle ID
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
 *         description: Úspěšné pozastavení členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.put('/memberships/pause/:id', PaymentController.pauseSubscription);

// Obnovení členství podle ID
/**
 * @swagger
 * /memberships/reactivate/{id}:
 *   put:
 *     summary: Obnovení členství podle ID
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
 *         description: Úspěšné obnovení členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.put('/memberships/reactivate/:id', PaymentController.reactivateSubscription);

// Zrušení členství podle ID
/**
 * @swagger
 * /memberships/cancel/{id}:
 *   put:
 *     summary: Zrušení členství podle ID
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
 *         description: Úspěšné zrušení členství
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       404:
 *         description: Členství nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.put('/memberships/cancel/:id', PaymentController.cancelSubscription);

module.exports = router;
