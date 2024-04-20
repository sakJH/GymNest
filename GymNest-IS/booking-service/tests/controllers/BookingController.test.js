const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const BookingController = require('../../src/controllers/BookingController');
const BookingService = require('../../src/services/BookingService');

describe('BookingController', function () {
    let app;
    let request;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        app = express();
        app.use(bodyParser.json());
        app.post('/bookings', BookingController.createBooking);
        app.put('/bookings', BookingController.updateBooking);
        app.delete('/bookings/:bookingId', BookingController.cancelBooking);
        app.get('/bookings/:bookingId', BookingController.findBookingById);
        app.get('/bookings/user/:userId', BookingController.findBookingsByUserId);
        request = supertest(app);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST /bookings', () => {
        it('should create a booking and return 201', async () => {
            const bookingDetails = { userId: 1, activityId: 2, scheduleId: 3, bookingDate: '2024-04-15' };
            sandbox.stub(BookingService, 'createBooking').resolves(bookingDetails);

            const res = await request.post('/bookings')
                .send(bookingDetails)
                .expect(201);

            expect(res.body).to.deep.equal(bookingDetails);
            expect(BookingService.createBooking.calledOnceWithExactly(bookingDetails)).to.be.true;
        });

        it('should handle errors and return 500', async () => {
            sandbox.stub(BookingService, 'createBooking').throws(new Error('Internal server error'));

            const res = await request.post('/bookings')
                .send({ userId: 1, activityId: 2, scheduleId: 3, bookingDate: '2024-04-15' })
                .expect(500);

            expect(res.body).to.deep.equal({ message: 'Internal server error' });
        });
    });

});
