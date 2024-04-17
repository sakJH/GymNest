const express = require('express');
const BookingController = require('../controllers/BookingController');

const router = express.Router();

// Cesta pro vytvoření nové rezervace
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Vytvoření nové rezervace
 *     tags: [Bookings]
 *     description: Vytvoření nové rezervace s danými parametry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Rezervace byla úspěšně vytvořena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.post('/bookings/create', BookingController.createBooking);

// Cesta pro aktualizaci existující rezervace
/**
 * @swagger
 * /bookings/update:
 *   put:
 *     summary: Aktualizace rezervace
 *     tags: [Bookings]
 *     description: Aktualizace rezervace podle zadaných parametrů
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Rezervace byla úspěšně aktualizována
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.put('/bookings/update', BookingController.updateBooking);

// Cesta pro zrušení rezervace
/**
 * @swagger
 * /bookings/cancel/{bookingId}:
 *   delete:
 *     summary: Zrušení rezervace
 *     tags: [Bookings]
 *     description: Zrušení rezervace podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID rezervace
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Rezervace byla úspěšně zrušena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.delete('/bookings/cancel/:bookingId', BookingController.cancelBooking);

// Cesta pro vyhledání rezervace podle ID
/**
 * @swagger
 * /bookings/{bookingId}:
 *   get:
 *     summary: Vyhledání rezervace
 *     tags: [Bookings]
 *     description: Vyhledání rezervace podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID rezervace
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Rezervace byla úspěšně nalezena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/bookings/:bookingId', BookingController.findBookingById);

// Cesta pro vyhledání všech rezervací uživatele
/**
 * @swagger
 * /bookings/user/{userId}:
 *   get:
 *     summary: Vyhledání rezervací uživatele
 *     tags: [Bookings]
 *     description: Vyhledání všech rezervací pro daného uživatele
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID uživatele
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Rezervace byly úspěšně nalezeny
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/bookings/user/:userId', BookingController.findBookingsByUserId);

module.exports = router;
