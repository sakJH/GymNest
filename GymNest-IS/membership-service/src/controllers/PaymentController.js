const PaymentService = require('../services/PaymentService');

// PayPal SDK
const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../utils/paypalClient');

class PaymentController {
    // Vytvoření nové platby pomocí PayPal API
    async createPayment(req, res) {
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
