const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Payment extends Model {

    // Vytvoření nové platby
    static async createPayment(details) {
        try {
            const payment = await this.create(details);
            return payment;
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace stavu platby
    static async updatePaymentStatus(paymentId, newStatus) {
        try {
            const payment = await this.findByPk(paymentId);
            if (!payment) {
                throw new Error('Payment not found');
            }
            payment.status = newStatus;
            await payment.save();
            return payment;
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání plateb podle uživatele nebo předplatného
    static async findPaymentsBySubscriptionId(subscriptionId) {
        try {
            const payments = await this.findAll({
                where: { subscriptionId }
            });
            return payments;
        } catch (error) {
            throw error;
        }
    }

    // Zpracování vrácení peněz
    static async processRefund(paymentId) {
        try {
            const payment = await this.findByPk(paymentId);
            if (!payment || payment.status !== 'completed') {
                throw new Error('Refund cannot be processed');
            }
            // Předpokládá se logika pro zpracování vrácení peněz...
            payment.status = 'refunded';
            await payment.save();
            return payment;
        } catch (error) {
            throw error;
        }
    }

    // Vyhledání plateb podle stavu
    static async findPaymentsByStatus(status) {
        try {
            const payments = await this.findAll({
                where: { status }
            });
            return payments;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro generování sestav o platebních transakcích
    static async generatePaymentReport(/* parametry pro filtraci a agregaci */) {
        // TODO - dodělat nebo smazat
    }

    //TODO - další metody???
}

Payment.init({
    // ID platby
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Částka platby
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    // Datum platby
    paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // Status platby (např. 'pending', 'completed', 'failed')
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Odkaz na předplatné nebo členství
    subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subscriptions', // Název tabulky předplatných
            key: 'id'
        }
    },
    // Popis platby nebo poznámky (volitelné)
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
    // Zde můžete přidat další atributy dle potřeby
}, {
    sequelize,
    modelName: 'Payment',
    timestamps: true // Povolit automatické timestampy createdAt a updatedAt
});

module.exports = Payment;
