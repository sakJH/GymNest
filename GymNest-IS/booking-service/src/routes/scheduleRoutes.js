const express = require('express');
const ScheduleController = require('../controllers/ScheduleController');

// Vytvoření nové instance routeru
const router = express.Router();

// Definování cesty pro vytvoření nového harmonogramu
/**
 * @swagger
 * /schedules/create:
 *   post:
 *     summary: Vytvoření nového harmonogramu
 *     tags: [Schedules]
 *     description: Vytvoří nový harmonogram s danými parametry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Harmonogram byl úspěšně vytvořen.
 *       400:
 *         description: Chybný formát požadavku.
 *       500:
 *         description: Interní chyba serveru.
 */
router.post('/schedules/create', ScheduleController.createSchedule);

// Aktualizace existujícího harmonogramu
/**
 * @swagger
 * /schedules/update:
 *   put:
 *     summary: Aktualizace harmonogramu
 *     tags: [Schedules]
 *     description: Aktualizuje existující harmonogram podle zadaných parametrů.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně aktualizován.
 *       400:
 *         description: Chybný formát požadavku.
 *       500:
 *         description: Interní chyba serveru.
 */
router.put('/schedules/update', ScheduleController.updateSchedule);

// Definování cesty pro zrušení harmonogramu podle jeho ID
/**
 * @swagger
 * /schedules/cancel/{scheduleId}:
 *   delete:
 *     summary: Zrušení harmonogramu
 *     tags: [Schedules]
 *     description: Zruší harmonogram podle zadaného ID.
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         description: ID harmonogramu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně zrušen.
 *       400:
 *         description: Chybný formát požadavku.
 *       500:
 *         description: Interní chyba serveru.
 */
router.delete('/schedules/cancel/:scheduleId', ScheduleController.deleteSchedule);

// Definování cesty pro vyhledání konkrétního harmonogramu podle jeho ID
/**
 * @swagger
 * /schedules/find/{scheduleId}:
 *   get:
 *     summary: Vyhledání harmonogramu podle ID
 *     tags: [Schedules]
 *     description: Vyhledá harmonogram podle zadaného ID.
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         description: ID harmonogramu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Harmonogram byl úspěšně nalezen.
 *       400:
 *         description: Chybný formát požadavku.
 *       500:
 *         description: Interní chyba serveru.
 */
router.get('/schedules/find/:scheduleId', ScheduleController.findScheduleById);

// Definování cesty pro získání seznamu všech harmonogramů
/**
 * @swagger
 * /schedules/all:
 *   get:
 *     summary: Vyhledání všech harmonogramů
 *     tags: [Schedules]
 *     description: Získá seznam všech dostupných harmonogramů.
 *     responses:
 *       200:
 *         description: Seznam všech harmonogramů byl úspěšně získán.
 *       500:
 *         description: Interní chyba serveru.
 */
router.get('/schedules/all', ScheduleController.findAllSchedules);

// Definování cesty pro získání seznamu všech harmonogramů podle zadaného rozsahu
router.get('/schedules/allByRange', ScheduleController.findAllSchedulesByRange);

module.exports = router;
