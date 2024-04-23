const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const express = require('express');
const supertest = require('supertest');
const BookingController = require('../../src/controllers/BookingController');
const router = require('../../src/routes/bookingRoutes');

describe('Booking routes', function() {
    let app, request, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        app = express();
        app.use(express.json());
        app.use(router);
        request = supertest(app);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST /bookings/create', () => {
        it('should call the createBooking method of BookingController', async () => {
            const createStub = sandbox.stub(BookingController, 'createBooking').callsFake((req, res) => res.sendStatus(201));
            await request.post('/bookings/create').send({ data: 'sample data' });
            expect(createStub.calledOnce).to.be.true;
        });
    });

    describe('PUT /bookings/update', () => {
        it('should call the updateBooking method of BookingController', async () => {
            const updateStub = sandbox.stub(BookingController, 'updateBooking').callsFake((req, res) => res.sendStatus(200));
            await request.put('/bookings/update').send({ data: 'updated data' });
            expect(updateStub.calledOnce).to.be.true;
        });
    });

    describe('DELETE /bookings/cancel/:bookingId', () => {
        it('should call the cancelBooking method of BookingController', async () => {
            const cancelStub = sandbox.stub(BookingController, 'cancelBooking').callsFake((req, res) => res.sendStatus(200));
            await request.delete('/bookings/cancel/1');
            expect(cancelStub.calledOnce).to.be.true;
        });
    });


});

