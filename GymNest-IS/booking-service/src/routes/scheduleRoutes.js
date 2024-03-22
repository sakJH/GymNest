const express = require('express');
const ScheduleController = require('../controllers/ScheduleController');

// Vytvoření nové instance routeru
const router = express.Router();

// Definování cesty pro vytvoření nového harmonogramu
/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Vytvoření nového harmonogramu
 *     description: Vytvoření nového harmonogramu s danými parametry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně vytvořen
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.post('/schedules', ScheduleController.createSchedule);

// Aktualizace existujícího harmonogramu
/**
 * @swagger
 * /schedules:
 *   put:
 *     summary: Aktualizace harmonogramu
 *     description: Aktualizace harmonogramu podle zadaných parametrů
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně aktualizován
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.put('/schedules', ScheduleController.updateSchedule);

// Definování cesty pro zrušení harmonogramu podle jeho ID
/**
 * @swagger
 * /schedules/{scheduleId}:
 *   delete:
 *     summary: Zrušení harmonogramu
 *     description: Zrušení harmonogramu podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         description: ID harmonogramu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně zrušen
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.delete('/schedules/:scheduleId', ScheduleController.deleteSchedule);

// Definování cesty pro vyhledání konkrétního harmonogramu podle jeho ID
/**
 * @swagger
 * /schedules/{scheduleId}:
 *   get:
 *     summary: Vyhledání harmonogramu podle ID
 *     description: Vyhledání harmonogramu podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         description: ID harmonogramu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně nalezen
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/schedules/:scheduleId', ScheduleController.findScheduleById);

// Definování cesty pro získání seznamu všech harmonogramů
/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Vyhledání všech harmonogramů
 *     description: Vyhledání všech harmonogramů
 *     responses:
 *       200:
 *         description: Seznam harmonogramů byl úspěšně nalezen
 */
router.get('/schedules', ScheduleController.findAllSchedules);

// Export routeru pro použití v hlavní aplikaci
module.exports = router;
