const express = require('express');
const BookingController = require('../controllers/BookingController');

const router = express.Router();

// Cesta pro vytvoření nové rezervace
router.post('/bookings', BookingController.createBooking);

// Cesta pro aktualizaci existující rezervace
router.put('/bookings/update', BookingController.updateBooking);

// Cesta pro zrušení rezervace
router.delete('/bookings/cancel/:bookingId', BookingController.cancelBooking);

// Cesta pro vyhledání rezervace podle ID
router.get('/bookings/:bookingId', BookingController.findBookingById);

// Cesta pro vyhledání všech rezervací uživatele
router.get('/bookings/user/:userId', BookingController.findBookingsByUserId);

module.exports = router;
