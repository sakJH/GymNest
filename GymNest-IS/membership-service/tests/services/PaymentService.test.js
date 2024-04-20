const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const PaymentService = require('../../src/services/PaymentService');
const Payment = require('../../src/models/Payment'); // Upravte cestu dle vaší struktury projektu

describe('PaymentService', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Payment, 'createPayment').resolves();
        sandbox.stub(Payment, 'updatePaymentStatus').resolves();
        sandbox.stub(Payment, 'findPaymentsBySubscriptionId').resolves();
        sandbox.stub(Payment, 'processRefund').resolves();
        sandbox.stub(Payment, 'findPaymentsByStatus').resolves();
        sandbox.stub(Payment, 'findPaymentsByUserId').resolves();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a payment', async function () {
        const paymentDetails = { amount: 100.00, paymentDate: new Date(), status: 'pending' };
        Payment.createPayment.resolves(paymentDetails);
        const result = await PaymentService.createPayment(paymentDetails);
        expect(Payment.createPayment.calledOnceWithExactly(paymentDetails)).to.be.true;
        expect(result).to.deep.equal(paymentDetails);
    });

    it('should update a payment status', async function () {
        const paymentId = 1;
        const newStatus = 'completed';
        Payment.updatePaymentStatus.resolves({ id: paymentId, status: newStatus });
        const result = await PaymentService.updatePaymentStatus(paymentId, newStatus);
        expect(Payment.updatePaymentStatus.calledOnceWithExactly(paymentId, newStatus)).to.be.true;
        expect(result).to.deep.equal({ id: paymentId, status: newStatus });
    });

    it('should find payments by subscription ID', async function () {
        const subscriptionId = 1;
        const payments = [{ id: 1, amount: 100.00 }];
        Payment.findPaymentsBySubscriptionId.resolves(payments);
        const result = await PaymentService.findPaymentsBySubscriptionId(subscriptionId);
        expect(Payment.findPaymentsBySubscriptionId.calledOnceWithExactly(subscriptionId)).to.be.true;
        expect(result).to.deep.equal(payments);
    });

    it('should process a refund', async function () {
        const paymentId = 1;
        Payment.processRefund.resolves({ id: paymentId, status: 'refunded' });
        const result = await PaymentService.processRefund(paymentId);
        expect(Payment.processRefund.calledOnceWithExactly(paymentId)).to.be.true;
        expect(result).to.deep.equal({ id: paymentId, status: 'refunded' });
    });

    it('should find payments by status', async function () {
        const status = 'completed';
        const payments = [{ id: 1, status: status }];
        Payment.findPaymentsByStatus.resolves(payments);
        const result = await PaymentService.findPaymentsByStatus(status);
        expect(Payment.findPaymentsByStatus.calledOnceWithExactly(status)).to.be.true;
        expect(result).to.deep.equal(payments);
    });

});
