const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const BookingService = require('../../src/services/BookingService');
const Booking = require('../../src/models/Booking');

describe('BookingService', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Booking, 'createBooking');
        sandbox.stub(Booking, 'updateBooking');
        sandbox.stub(Booking, 'cancelBooking');
        sandbox.stub(Booking, 'findBookingById');
        sandbox.stub(Booking, 'findBookingsByUserId');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a booking', async function() {
        const bookingDetails = { userId: 1, activityId: 2, scheduleId: 3 };
        Booking.createBooking.resolves(bookingDetails);
        const result = await BookingService.createBooking(bookingDetails);
        expect(Booking.createBooking.calledOnceWithExactly(bookingDetails)).to.be.true;
        expect(result).to.deep.equal(bookingDetails);
    });

    it('should update a booking', async function() {
        const bookingId = 1;
        const updateDetails = { status: 'cancelled' };
        Booking.updateBooking.resolves(updateDetails);
        const result = await BookingService.updateBooking(bookingId, updateDetails);
        expect(Booking.updateBooking.calledOnceWithExactly(bookingId, updateDetails)).to.be.true;
        expect(result).to.deep.equal(updateDetails);
    });

    it('should cancel a booking', async function() {
        const bookingId = 1;
        Booking.cancelBooking.resolves({ message: 'Booking successfully cancelled' });
        const result = await BookingService.cancelBooking(bookingId);
        expect(Booking.cancelBooking.calledOnceWithExactly(bookingId)).to.be.true;
        expect(result).to.deep.equal({ message: 'Booking successfully cancelled' });
    });

    it('should find a booking by ID', async function() {
        const bookingId = 1;
        const bookingDetails = { id: bookingId, status: 'scheduled' };
        Booking.findBookingById.resolves(bookingDetails);
        const result = await BookingService.findBookingById(bookingId);
        expect(Booking.findBookingById.calledOnceWithExactly(bookingId)).to.be.true;
        expect(result).to.deep.equal(bookingDetails);
    });

    it('should find bookings by user ID', async function() {
        const userId = 1;
        const bookings = [{ id: 1, status: 'scheduled' }, { id: 2, status: 'cancelled' }];
        Booking.findBookingsByUserId.resolves(bookings);
        const result = await BookingService.findBookingsByUserId(userId);
        expect(Booking.findBookingsByUserId.calledOnceWithExactly(userId)).to.be.true;
        expect(result).to.deep.equal(bookings);
    });
});
