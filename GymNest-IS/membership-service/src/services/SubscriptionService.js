const Subscription = require('../models/Subscription');

class SubscriptionService {
    async findActive() {
        return await Subscription.findActive();
    }

    async pauseSubscription(id) {
        return await Subscription.pauseSubscription(id);
    }

    async reactivateSubscription(id) {
        return await Subscription.reactivateSubscription(id);
    }

    async cancelSubscription(id) {
        return await Subscription.cancelSubscription(id);
    }

    async findByType(type) {
        return await Subscription.findByType(type);
    }

    async findExpiringSoon(days) {
        return await Subscription.findExpiringSoon(days);
    }

    async renewSubscription(id, durationMonths) {
        return await Subscription.renewSubscription(id, durationMonths);
    }

    async findByStatus(status) {
        return await Subscription.findByStatus(status);
    }

    async changeSubscriptionType(id, newType) {
        return await Subscription.changeSubscriptionType(id, newType);
    }
}

module.exports = new SubscriptionService();
