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
 *     tags: [Activities]
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
router.post('/activities/create', ActivityController.createActivity);

// Definice cesty pro aktualizaci aktivity
/**
 * @swagger
 * /activities:
 *   put:
 *     summary: Aktualizace aktivity
 *     tags: [Activities]
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
router.put('/activities/update', ActivityController.updateActivity);

// Definice cesty pro zrušení aktivity podle jejího ID
/**
 * @swagger
 * /activities/{activityId}:
 *   delete:
 *     summary: Zrušení aktivity
 *     tags: [Activities]
 *     description: Zrušení aktivity podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID aktivity, která má být zrušena
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Aktivita byla úspěšně zrušena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.delete('/activities/delete/:activityId', ActivityController.deleteActivity);

// Definice cesty pro vyhledání aktivity podle jejího ID
/**
 * @swagger
 * /activities/{activityId}:
 *   get:
 *     summary: Vyhledání aktivity podle ID
 *     tags: [Activities]
 *     description: Vyhledání aktivity podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID aktivity, která má být vyhledána
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Aktivita byla úspěšně nalezena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/activities/find/:activityId', ActivityController.findActivityById);

// Definice cesty pro získání seznamu všech aktivit
/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Vyhledání všech aktivit
 *     tags: [Activities]
 *     description: Vyhledání všech aktivit
 *     responses:
 *       200:
 *         description: Seznam aktivit byl úspěšně nalezen
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/activities/all', ActivityController.findAllActivities);

// Definice cesty pro vyhledání aktivit podle typu a data
/**
 * @swagger
 * /activities/search:
 *   get:
 *     summary: Vyhledání aktivit podle typu a data
 *     tags: [Activities]
 *     description: Vyhledání aktivit podle zadaného typu a data
 *     parameters:
 *       - in: query
 *         name: membershipType
 *         required: true
 *         description: Typ aktivity, která má být vyhledána
 *         schema:
 *           membershipType: string
 *       - in: query
 *         name: date
 *         required: true
 *         description: Datum, pro které má být aktivita vyhledána
 *         schema:
 *           membershipType: string
 *     responses:
 *       200:
 *         description: Aktivity byly úspěšně nalezeny
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/activities/searchTypeAndDate', ActivityController.findActivitiesByTypeAndDate);

module.exports = router;
