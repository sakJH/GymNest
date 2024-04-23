const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// Vytvoření nové platby
/**
 * @swagger
 * /payments/create:
 *   post:
 *     summary: Vytvoření nové platby
 *     tags: [Payments]
 *     description: Tato operace vytvoří novou platbu podle zadaných parametrů.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentCreateRequest'
 *     responses:
 *       201:
 *         description: Platba byla úspěšně vytvořena.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Chybný formát požadavku.
 *       500:
 *         description: Chyba serveru.
 */
router.post('/payments/create', PaymentController.createPayment);

// Aktualizace stavu platby
/**
 * @swagger
 * /payments/status:
 *   put:
 *     summary: Aktualizace stavu platby
 *     tags: [Payments]
 *     description: Tato operace aktualizuje stav existující platby.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentStatusUpdateRequest'
 *     responses:
 *       200:
 *         description: Stav platby byl úspěšně aktualizován.
 *       400:
 *         description: Chybný formát požadavku.
 *       404:
 *         description: Platba nebyla nalezena.
 *       500:
 *         description: Chyba serveru.
 */
router.put('/payments/status', PaymentController.updatePaymentStatus);

// Získání plateb podle ID předplatného
/**
 * @swagger
 * /payments/subscription/{subscriptionId}:
 *   get:
 *     summary: Získání plateb podle ID předplatného
 *     tags: [Payments]
 *     description: Tato operace získá všechny platby spojené s konkrétním předplatným.
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         description: ID předplatného, pro které se mají získat platby.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seznam všech plateb pro dané předplatné.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentResponse'
 *       404:
 *         description: Předplatné nebylo nalezeno.
 *       500:
 *         description: Chyba serveru.
 */
router.get('/payments/subscription/:subscriptionId', PaymentController.findPaymentsBySubscriptionId);

// Zpracování vrácení peněz
/**
 * @swagger
 * /payments/{paymentId}/refund:
 *   post:
 *     summary: Zpracování vrácení peněz
 *     tags: [Payments]
 *     description: Tato operace zpracuje požadavek na vrácení peněz pro konkrétní platbu.
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: ID platby, pro kterou se má zpracovat vrácení peněz.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vrácení peněz bylo úspěšně zpracováno.
 *       404:
 *         description: Platba nebyla nalezena.
 *       500:
 *         description: Chyba serveru.
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
