const Payment = require('../models/Payment');

class PaymentService {
    async createPayment(details) {
        return await Payment.createPayment(details);
    }

    async updatePaymentStatus(paymentId, newStatus) {
        return await Payment.updatePaymentStatus(paymentId, newStatus);
    }

    async findPaymentsBySubscriptionId(subscriptionId) {
        return await Payment.findPaymentsBySubscriptionId(subscriptionId);
    }

    async processRefund(paymentId) {
        return await Payment.processRefund(paymentId);
    }

    async findPaymentsByStatus(status) {
        return await Payment.findPaymentsByStatus(status);
    }

    async generatePaymentReport(parameters) {
        // TODO - dodělat nebo smazat
        return await Payment.generatePaymentReport(parameters);
    }

    async findPaymentsByUserId(userId) {
        return await Payment.findPaymentsByUserId(userId);
    }

}

module.exports = new PaymentService();
