const Payment = require('../models/Payment');
const Membership = require('../models/Membership');

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
        try {
            // Najde všechna členství pro daného uživatele
            const memberships = await Membership.findAll({
                where: { userId: userId }
            });

            // Extrahuje všechna membershipId
            const membershipIds = memberships.map(membership => membership.id);

            // Najde všechny platby pro nalezená členství
            const payments = await Payment.findAll({
                where: { membershipId: membershipIds }
            });

            return payments;
        } catch (error) {
            throw new Error("Unable to retrieve payments: " + error.message);
        }
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
