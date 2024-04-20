const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const Payment = require('../../src/models/Payment');

describe('Payment Model', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Payment, 'init').callsFake((attributes, options) => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createPayment', function () {
        it('should successfully create a payment', async function () {
            const mockDetails = {
                amount: 100.00,
                paymentDate: '2023-01-01',
                status: 'pending',
                membershipId: 1
            };
            const expectedResult = { id: 1, ...mockDetails };

            sandbox.stub(Payment, 'create').resolves(expectedResult);

            const result = await Payment.createPayment(mockDetails);
            expect(result).to.deep.equal(expectedResult);
        });

        it('should throw an error if the payment creation fails', async function () {
            sandbox.stub(Payment, 'create').rejects(new Error('Database error'));

            await expect(Payment.createPayment({})).to.be.rejectedWith('Database error');
        });
    });

    describe('updatePaymentStatus', function () {
        it('should update the status of an existing payment', async function () {
            const payment = {
                id: 1,
                amount: 100.00,
                paymentDate: '2023-01-01',
                status: 'pending',
                membershipId: 1,
                save: sinon.stub().resolves()
            };

            sandbox.stub(Payment, 'findByPk').resolves(payment);
            const newStatus = 'completed';

            const result = await Payment.updatePaymentStatus(1, newStatus);
            expect(payment.save.calledOnce).to.be.true;
            expect(result.status).to.equal(newStatus);
        });

        it('should throw an error if payment not found', async function () {
            sandbox.stub(Payment, 'findByPk').resolves(null);

            await expect(Payment.updatePaymentStatus(999, 'completed')).to.be.rejectedWith('Payment not found');
        });
    });
});

