const SubscriptionService = require('../services/SubscriptionService');

class SubscriptionController {
    async findActiveSubscriptions(req, res) {
        try {
            const subscriptions = await SubscriptionService.findActive();
            res.json(subscriptions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async pauseSubscription(req, res) {
        try {
            const subscription = await SubscriptionService.pauseSubscription(req.params.id);
            res.json(subscription);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async reactivateSubscription(req, res) {
        try {
            const subscription = await SubscriptionService.reactivateSubscription(req.params.id);
            res.json(subscription);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async cancelSubscription(req, res) {
        try {
            const result = await SubscriptionService.cancelSubscription(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findSubscriptionsByType(req, res) {
        try {
            const subscriptions = await SubscriptionService.findByType(req.params.type);
            res.json(subscriptions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findExpiringSubscriptions(req, res) {
        try {
            const subscriptions = await SubscriptionService.findExpiringSoon(req.query.days);
            res.json(subscriptions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async renewSubscription(req, res) {
        try {
            const subscription = await SubscriptionService.renewSubscription(req.params.id, req.body.durationMonths);
            res.json(subscription);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findSubscriptionsByStatus(req, res) {
        try {
            const subscriptions = await SubscriptionService.findByStatus(req.params.status);
            res.json(subscriptions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changeSubscriptionType(req, res) {
        try {
            const subscription = await SubscriptionService.changeSubscriptionType(req.params.id, req.body.newType);
            res.json(subscription);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new SubscriptionController();
