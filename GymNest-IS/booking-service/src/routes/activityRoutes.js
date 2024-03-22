const express = require('express');
const ActivityController = require('../controllers/ActivityController');

// Vytvoření routeru
const router = express.Router();

// Definice cesty pro vytvoření nové aktivity
/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Vytvoření nové aktivity
 *     description: Vytvoření nové aktivity s danými parametry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Aktivita byla úspěšně vytvořena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.post('/activities', ActivityController.createActivity);

// Definice cesty pro aktualizaci aktivity
/**
 * @swagger
 * /activities:
 *   put:
 *     summary: Aktualizace aktivity
 *     description: Aktualizace aktivity podle zadaných parametrů
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Aktivita byla úspěšně aktualizována
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.put('/activities', ActivityController.updateActivity);

// Definice cesty pro zrušení aktivity podle jejího ID
/**
 * @swagger
 * /activities/{activityId}:
 *   delete:
 *     summary: Zrušení aktivity
 *     description: Zrušení aktivity podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID aktivity, která má být zrušena
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aktivita byla úspěšně zrušena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.delete('/activities/:activityId', ActivityController.deleteActivity);

// Definice cesty pro vyhledání aktivity podle jejího ID
/**
 * @swagger
 * /activities/{activityId}:
 *   get:
 *     summary: Vyhledání aktivity podle ID
 *     description: Vyhledání aktivity podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID aktivity, která má být vyhledána
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aktivita byla úspěšně nalezena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/activities/:activityId', ActivityController.findActivityById);

// Definice cesty pro získání seznamu všech aktivit
/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Vyhledání všech aktivit
 *     description: Vyhledání všech aktivit
 *     responses:
 *       200:
 *         description: Seznam aktivit byl úspěšně nalezen
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/activities', ActivityController.findAllActivities);

// Definice cesty pro vyhledání aktivit podle typu a data
/**
 * @swagger
 * /activities/search:
 *   get:
 *     summary: Vyhledání aktivit podle typu a data
 *     description: Vyhledání aktivit podle zadaného typu a data
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         description: Typ aktivity, která má být vyhledána
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         description: Datum, pro které má být aktivita vyhledána
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aktivity byly úspěšně nalezeny
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/activities/search', ActivityController.findActivitiesByTypeAndDate);

module.exports = router;
