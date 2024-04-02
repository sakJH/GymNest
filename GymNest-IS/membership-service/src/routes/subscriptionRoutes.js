const express = require('express');
const SubscriptionController = require('../controllers/SubscriptionController');

const router = express.Router();

// Získání všech aktivních předplatných
/**
 * @swagger
 * /subscriptions/active:
 *   get:
 *     summary: Získání všech aktivních předplatných
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Úspěšné získání všech aktivních předplatných
 *       500:
 *         description: Chyba serveru
 */
router.get('/subscriptions/active', SubscriptionController.findActiveSubscriptions);

// Pozastavení předplatného podle ID
/**
 * @swagger
 * /subscriptions/{id}/pause:
 *   post:
 *     summary: Pozastavení předplatného podle ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID předplatného
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšné pozastavení předplatného
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Předplatné nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.post('/subscriptions/:id/pause', SubscriptionController.pauseSubscription);

// Reaktivace předplatného podle ID
/**
 * @swagger
 * /subscriptions/{id}/reactivate:
 *   post:
 *     summary: Reaktivace předplatného podle ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID předplatného
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšná reaktivace předplatného
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Předplatné nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.post('/subscriptions/:id/reactivate', SubscriptionController.reactivateSubscription);

// Zrušení předplatného podle ID
/**
 * @swagger
 * /subscriptions/{id}/cancel:
 *   post:
 *     summary: Zrušení předplatného podle ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID předplatného
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšné zrušení předplatného
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Předplatné nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.post('/subscriptions/:id/cancel', SubscriptionController.cancelSubscription);

// Získání předplatných podle typu
/**
 * @swagger
 * /subscriptions/type/{type}:
 *   get:
 *     summary: Získání předplatných podle typu
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Typ předplatného
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seznam předplatných
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Chyba serveru
 */
router.get('/subscriptions/type/:type', SubscriptionController.findSubscriptionsByType);

// Získání předplatných, které brzy skončí
/**
 * @swagger
 * /subscriptions/expiring:
 *   get:
 *     summary: Získání předplatných, které brzy skončí
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Seznam předplatných
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Chyba serveru
 */
router.get('/subscriptions/expiring', SubscriptionController.findExpiringSubscriptions);

// Obnovení předplatného podle ID
/**
 * @swagger
 * /subscriptions/{id}/renew:
 *   post:
 *     summary: Obnovení předplatného podle ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID předplatného
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Úspěšné obnovení předplatného
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Předplatné nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.post('/subscriptions/:id/renew', SubscriptionController.renewSubscription);

// Získání předplatných podle statusu
/**
 * @swagger
 * /subscriptions/status/{status}:
 *   get:
 *     summary: Získání předplatných podle statusu
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Status předplatného
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seznam předplatných
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Chyba serveru
 */
router.get('/subscriptions/status/:status', SubscriptionController.findSubscriptionsByStatus);

// Změna typu předplatného
/**
 * @swagger
 * /subscriptions/{id}/changeType:
 *   post:
 *     summary: Změna typu předplatného
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID předplatného
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Nový typ předplatného
 *     responses:
 *       200:
 *         description: Úspěšná změna typu předplatného
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Chybný formát požadavku
 *       404:
 *         description: Předplatné nebylo nalezeno
 *       500:
 *         description: Chyba serveru
 */
router.post('/subscriptions/:id/changeType', SubscriptionController.changeSubscriptionType);

module.exports = router;
