const express = require('express');
const ActivityController = require('../controllers/ActivityController');

// Vytvoření routeru
const router = express.Router();

// Definice cesty pro vytvoření nové aktivity
router.post('/activities', ActivityController.createActivity);

// Definice cesty pro aktualizaci aktivity
router.put('/activities', ActivityController.updateActivity);

// Definice cesty pro zrušení aktivity podle jejího ID
router.delete('/activities/:activityId', ActivityController.deleteActivity);

// Definice cesty pro vyhledání aktivity podle jejího ID
router.get('/activities/:activityId', ActivityController.findActivityById);

// Definice cesty pro získání seznamu všech aktivit
router.get('/activities', ActivityController.findAllActivities);

// Definice cesty pro vyhledání aktivit podle typu a data
router.get('/activities/search', ActivityController.findActivitiesByTypeAndDate);

module.exports = router;
