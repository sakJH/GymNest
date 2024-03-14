const Booking = require('../models/Booking');

class BookingService {
    async createBooking(details) {
        return await Booking.createBooking(details);
    }

    async updateBooking(bookingId, updateDetails) {
        return await Booking.updateBooking(bookingId, updateDetails);
    }

    async cancelBooking(bookingId) {
        return await Booking.cancelBooking(bookingId);
    }

    async findBookingById(bookingId) {
        return await Booking.findBookingById(bookingId);
    }

    async findBookingsByUserId(userId) {
        return await Booking.findBookingsByUserId(userId);
    }

}

module.exports = new BookingService();
