const Booking = require('../models/Booking');

class BookingService {
    async createBooking(details) {
        try {
            return await Booking.createBooking(details);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateBooking(bookingId, updateDetails) {
        try {
            return await Booking.updateBooking(bookingId, updateDetails);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async cancelBooking(bookingId) {
        try {
            return await Booking.cancelBooking(bookingId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findBookingById(bookingId) {
        try {
            return await Booking.findBookingById(bookingId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findBookingsByUserId(userId) {
        try {
            return await Booking.findBookingsByUserId(userId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = new BookingService();
