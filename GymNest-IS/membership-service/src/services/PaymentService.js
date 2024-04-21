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


    async findPaymentsByUserId(userId) {
        return await Payment.findPaymentsByUserId(userId);
    }

    // Metody pro pozastavení členství
    async pausePayment(id) {
        try {
            const pausedMembership = await Payment.pausePayment(id);
            console.log('Membership paused successfully:', pausedMembership);
            return pausedMembership;
        } catch (error) {
            console.error('Error pausing membership:', error);
            throw error;
        }
    }

    async reactivatePayment(id) {
        try {
            const reactivatedMembership = await Payment.reactivatePayment(id);
            console.log('Membership reactivated successfully:', reactivatedMembership);
            return reactivatedMembership;
        } catch (error) {
            console.error('Error reactivating membership:', error);
            throw error;
        }
    }

    async cancelPayment(id) {
        try {
            const cancelledMembership = await Payment.cancelPayment(id);
            console.log('Membership cancelled successfully:', cancelledMembership);
            return cancelledMembership;
        } catch (error) {
            console.error('Error cancelling membership:', error);
            throw error;
        }
    }



}

module.exports = new PaymentService();
