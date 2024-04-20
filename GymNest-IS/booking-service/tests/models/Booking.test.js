const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Booking = require('../../src/models/Booking');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Booking', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createBooking', function () {
        it('should create a booking', async function () {
            const details = { userId: 1, activityId: 2, scheduleId: 3, bookingDate: new Date() };
            const expectedBooking = { ...details, status: 'scheduled', id: 1 };

            sandbox.stub(Booking, 'create').resolves(expectedBooking);
            const result = await Booking.createBooking(details);

            expect(Booking.create.calledOnce).to.be.true;
            expect(result).to.deep.equal(expectedBooking);
        });

        it('should handle errors during booking creation', async function () {
            const details = { userId: 1, activityId: 2, scheduleId: 3, bookingDate: new Date() };
            sandbox.stub(Booking, 'create').rejects(new Error('Database error'));

            await expect(Booking.createBooking(details)).to.be.rejectedWith('Database error');
        });
    });

    describe('updateBooking', function () {
        it('should update a booking', async function () {
            const mockBooking = { id: 1, update: sinon.stub().resolves() };
            sandbox.stub(Booking, 'findByPk').resolves(mockBooking);

            const updateDetails = { status: 'completed' };
            const result = await Booking.updateBooking(1, updateDetails);

            expect(Booking.findByPk.calledWith(1)).to.be.true;
            expect(mockBooking.update.calledWith(updateDetails)).to.be.true;
        });

        it('should throw an error if booking not found', async function () {
            sandbox.stub(Booking, 'findByPk').resolves(null);

            await expect(Booking.updateBooking(1, {})).to.be.rejectedWith('Booking not found');
        });
    });

    describe('cancelBooking', function () {
        it('should cancel a booking', async function () {
            const mockBooking = { id: 1, update: sinon.stub().resolves() };
            sandbox.stub(Booking, 'findByPk').resolves(mockBooking);

            const result = await Booking.cancelBooking(1);
            expect(Booking.findByPk.calledWith(1)).to.be.true;
            expect(mockBooking.update.calledWith({ status: 'cancelled' })).to.be.true;
        });

        it('should throw an error if booking is not found', async function () {
            sandbox.stub(Booking, 'findByPk').resolves(null);

            await expect(Booking.cancelBooking(1)).to.be.rejectedWith('Booking not found');
        });
    });

    describe('findBookingById', function () {
        it('should find a booking by ID', async function () {
            const expectedBooking = { id: 1, status: 'scheduled' };
            sandbox.stub(Booking, 'findByPk').resolves(expectedBooking);

            const result = await Booking.findBookingById(1);
            expect(Booking.findByPk.calledWith(1)).to.be.true;
            expect(result).to.deep.equal(expectedBooking);
        });

        it('should throw an error if booking not found', async function () {
            sandbox.stub(Booking, 'findByPk').resolves(null);

            await expect(Booking.findBookingById(1)).to.be.rejectedWith('Booking not found');
        });
    });

    describe('findBookingsByUserId', function () {
        it('should retrieve all bookings for a user', async function () {
            const expectedBookings = [{ id: 1, userId: 1 }, { id: 2, userId: 1 }];
            sandbox.stub(Booking, 'findAll').resolves(expectedBookings);

            const result = await Booking.findBookingsByUserId(1);
            expect(Booking.findAll.calledOnce).to.be.true;
            expect(result).to.deep.equal(expectedBookings);
        });

        it('should handle errors during fetching bookings', async function () {
            sandbox.stub(Booking, 'findAll').rejects(new Error('Database error'));

            await expect(Booking.findBookingsByUserId(1)).to.be.rejectedWith('Database error');
        });
    });

});
