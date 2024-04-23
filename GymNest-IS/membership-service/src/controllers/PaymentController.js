const PaymentService = require('../services/PaymentService');

// PayPal SDK
const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../utils/paypalClient');

class PaymentController {
    // Vytvoření nové platby pomocí PayPal API
    async createPayPalPayment(req, res) {
        const { currency, amount } = req.body;
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency, // Dynamicky nastavitelná měna
                    value: amount // Dynamicky nastavitelná cena
                }
            }]
        });

        try {
            const order = await paypalClient.client().execute(request);
            res.json({ id: order.result.id });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Vytvoření nové platby
    async createPayment(req, res) {
        try {
            const details = req.body;
            const payment = await PaymentService.createPayment(details);
            res.json(payment);
        } catch (err) {
            res.status(500).json({ message: err.message });
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

    // Získání všech plateb uživatele
    async findPaymentsByUserId(req, res) {
        try {
            const { userId } = req.params;
            const payments = await PaymentService.findPaymentsByUserId(userId);
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Metody pro pozastavení členství
    async pauseSubscription(req, res) {
        const { id } = req.params;
        try {
            const pauseSubscription = await PaymentService.pausePayment(id);
            res.status(200).json(pauseSubscription);
        } catch (error) {
            console.error('Error pausing membership:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async reactivateSubscription(req, res) {
        const { id } = req.params;
        try {
            const reactivatedMembership = await PaymentService.reactivatePayment(id);
            res.status(200).json(reactivatedMembership);
        } catch (error) {
            console.error('Error reactivating membership:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async cancelSubscription(req, res) {
        const { id } = req.params;
        try {
            const cancelledMembership = await PaymentService.cancelPayment(id);
            res.status(200).json(cancelledMembership);
        } catch (error) {
            console.error('Error cancelling membership:', error);
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new PaymentController();
