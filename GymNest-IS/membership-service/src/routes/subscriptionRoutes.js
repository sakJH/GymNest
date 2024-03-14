const express = require('express');
const SubscriptionController = require('../controllers/SubscriptionController');

const router = express.Router();

// Získání všech aktivních předplatných
router.get('/subscriptions/active', SubscriptionController.findActiveSubscriptions);

// Pozastavení předplatného podle ID
router.post('/subscriptions/:id/pause', SubscriptionController.pauseSubscription);

// Reaktivace předplatného podle ID
router.post('/subscriptions/:id/reactivate', SubscriptionController.reactivateSubscription);

// Zrušení předplatného podle ID
router.post('/subscriptions/:id/cancel', SubscriptionController.cancelSubscription);

// Získání předplatných podle typu
router.get('/subscriptions/type/:type', SubscriptionController.findSubscriptionsByType);

// Získání předplatných, které brzy skončí
router.get('/subscriptions/expiring', SubscriptionController.findExpiringSubscriptions);

// Obnovení předplatného podle ID
router.post('/subscriptions/:id/renew', SubscriptionController.renewSubscription);

// Získání předplatných podle statusu
router.get('/subscriptions/status/:status', SubscriptionController.findSubscriptionsByStatus);

// Změna typu předplatného
router.post('/subscriptions/:id/changeType', SubscriptionController.changeSubscriptionType);

module.exports = router;
