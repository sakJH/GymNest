const express = require('express');
const NotificationController = require('../controllers/NotificationController');

// Vytvoření routeru
const router = express.Router();

// Definice cesty pro vytvoření nové notifikace
/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Vytvoření nové notifikace
 *     tags: [Notifications]
 *     description: Vytvoření nové notifikace s danými parametry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notifikace byla úspěšně vytvořena
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.post('/notifications', NotificationController.createNotification);

// Definice cesty pro aktualizaci notifikace
/**
 * @swagger
 * /notifications:
 *   put:
 *     summary: Aktualizace notifikace
 *     tags: [Notifications]
 *     description: Aktualizace notifikace podle zadaných parametrů
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notifikace byla úspěšně aktualizována
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.put('/notifications', NotificationController.updateNotification);

// Definice cesty pro smazání notifikace podle ID
/**
 * @swagger
 * /notifications/{notificationId}:
 *   delete:
 *     summary: Smazání notifikace
 *     tags: [Notifications]
 *     description: Smazání notifikace podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: ID notifikace
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notifikace byla úspěšně smazána
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.delete('/notifications/:notificationId', NotificationController.deleteNotification);

// Definice cesty pro vyhledání notifikace podle ID
/**
 * @swagger
 * /notifications/{notificationId}:
 *   get:
 *     summary: Vyhledání notifikace
 *     tags: [Notifications]
 *     description: Vyhledání notifikace podle zadaného ID
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: ID notifikace
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notifikace byla úspěšně nalezena
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/notifications/:notificationId', NotificationController.findNotificationById);

// Definice cesty pro získání všech notifikací pro daného uživatele
/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Vyhledání všech notifikací
 *     tags: [Notifications]
 *     description: Vyhledání všech notifikací pro daného uživatele
 *     responses:
 *       200:
 *         description: Seznam všech notifikací byl úspěšně nalezen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.get('/notifications', NotificationController.findAllNotifications);

// Definice cesty pro označení notifikace jako přečtené
/**
 * @swagger
 * /notifications/{notificationId}/read:
 *   patch:
 *     summary: Označení notifikace jako přečtené
 *     tags: [Notifications]
 *     description: Označení notifikace s daným ID jako přečtenou
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: ID notifikace
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notifikace byla úspěšně označena jako přečtená
 *       400:
 *         description: Chybný formát požadavku
 *       500:
 *         description: Chyba serveru
 */
router.patch('/notifications/:notificationId/read', NotificationController.markAsRead);

module.exports = router;
