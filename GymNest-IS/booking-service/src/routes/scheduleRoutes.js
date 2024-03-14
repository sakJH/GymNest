const express = require('express');
const ScheduleController = require('../controllers/ScheduleController');

// Vytvoření nové instance routeru
const router = express.Router();

// Definování cesty pro vytvoření nového harmonogramu
router.post('/schedules', ScheduleController.createSchedule);

// Definování cesty pro aktualizaci existujícího harmonogramu
// Předpokládá, že tělo požadavku obsahuje ID harmonogramu a detaily pro aktualizaci
router.put('/schedules', ScheduleController.updateSchedule);

// Definování cesty pro zrušení harmonogramu podle jeho ID
router.delete('/schedules/:scheduleId', ScheduleController.deleteSchedule);

// Definování cesty pro vyhledání konkrétního harmonogramu podle jeho ID
router.get('/schedules/:scheduleId', ScheduleController.findScheduleById);

// Definování cesty pro získání seznamu všech harmonogramů
router.get('/schedules', ScheduleController.findAllSchedules);

// Export routeru pro použití v hlavní aplikaci
module.exports = router;
