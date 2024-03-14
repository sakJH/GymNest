const PaymentService = require('../services/PaymentService');

class PaymentController {
    // Vytvoření nové platby
    async createPayment(req, res) {
        try {
            const paymentDetails = req.body;
            const payment = await PaymentService.createPayment(paymentDetails);
            res.status(201).json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Aktualizace stavu platby
    async updatePaymentStatus(req, res) {
        try {
            const { paymentId, newStatus } = req.body;
            const payment = await PaymentService.updatePaymentStatus(paymentId, newStatus);
            res.json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Získání plateb podle ID předplatného
    async findPaymentsBySubscriptionId(req, res) {
        try {
            const { subscriptionId } = req.params;
            const payments = await PaymentService.findPaymentsBySubscriptionId(subscriptionId);
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Zpracování vrácení peněz
    async processRefund(req, res) {
        try {
            const { paymentId } = req.params;
            const payment = await PaymentService.processRefund(paymentId);
            res.json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Vyhledání plateb podle stavu
    async findPaymentsByStatus(req, res) {
        try {
            const { status } = req.params;
            const payments = await PaymentService.findPaymentsByStatus(status);
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new PaymentController();
