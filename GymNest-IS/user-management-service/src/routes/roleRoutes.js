const express = require('express');
const RoleController = require('../controllers/RoleController');
const router = express.Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Inicializace rolí
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Role byly inicializovány
 *       500:
 *         description: Došlo k chybě na serveru
 */
router.post('/roles/initialize', RoleController.initializeRoles);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Získání všech rolí
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Seznam rolí
 *       500:
 *         description: Došlo k chybě na serveru
 */
router.get('/roles', RoleController.getAllRoles);

/**
 * @swagger
 * /roles/{roleName}/users:
 *   get:
 *     summary: Získání uživatelů podle role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleName
 *         schema:
 *           type: string
 *         required: true
 *         description: Název role
 *     responses:
 *       200:
 *         description: Seznam uživatelů s danou rolí
 *       500:
 *         description: Došlo k chybě na serveru
 */
router.get('/roles/:roleName/users', RoleController.findUsersByRole);

/**
 * @swagger
 * /users/{userId}/role:
 *   post:
 *     summary: Přidání výchozí role k uživateli
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID uživatele
 *       - in: body
 *         name: roleName
 *         schema:
 *           type: string
 *         required: true
 *         description: Název role
 *     responses:
 *       200:
 *         description: Role byla přidána
 *       500:
 *         description: Došlo k chybě na serveru
 */
router.put('/users/:userId/role', RoleController.setDefaultRole);

/**
 * @swagger
 * /users/{userId}/role:
 *   delete:
 *     summary: Odebrání role uživateli a přidělení výchozí role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID uživatele
 *     responses:
 *       200:
 *         description: Role byla odebrána
 *       500:
 *         description: Došlo k chybě na serveru
 */
router.delete('/users/:userId/role', RoleController.removeRoleToUser);

module.exports = router;
