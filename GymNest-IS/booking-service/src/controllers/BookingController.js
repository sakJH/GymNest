const BookingService = require('../services/BookingService');

class BookingController {
    // Vytvoření rezervace
    async createBooking(req, res) {
        try {
            const details = req.body;
            const booking = await BookingService.createBooking(details);
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Aktualizace rezervace
    async updateBooking(req, res) {
        try {
            const { bookingId, updateDetails } = req.body;
            const updatedBooking = await BookingService.updateBooking(bookingId, updateDetails);
            res.json(updatedBooking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Zrušení rezervace
    async cancelBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const result = await BookingService.cancelBooking(bookingId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Vyhledání rezervace podle ID
    async findBookingById(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.findBookingById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Vyhledání všech rezervací uživatele
    async findBookingsByUserId(req, res) {
        try {
            const { userId } = req.params;
            const bookings = await BookingService.findBookingsByUserId(userId);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new BookingController();
