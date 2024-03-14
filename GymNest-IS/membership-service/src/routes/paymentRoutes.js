const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// Vytvoření nové platby
router.post('/payments', PaymentController.createPayment);

// Aktualizace stavu platby
router.put('/payments/status', PaymentController.updatePaymentStatus);

// Získání plateb podle ID předplatného
router.get('/payments/subscription/:subscriptionId', PaymentController.findPaymentsBySubscriptionId);

// Zpracování vrácení peněz
router.post('/payments/:paymentId/refund', PaymentController.processRefund);

// Vyhledání plateb podle stavu
router.get('/payments/status/:status', PaymentController.findPaymentsByStatus);

module.exports = router;
