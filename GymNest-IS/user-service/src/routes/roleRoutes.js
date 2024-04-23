const express = require('express');
const RoleController = require('../controllers/RoleController');
const router = express.Router();

/**
 * Initializace rolí
 * Získání všech rolí
 * Získání uživatelů podle názvu role
 * Přidání role k uživateli
 * Odebrání role uživateli a přidělení výchozí role
 */

// Inicializace rolí
/**
 * @swagger
 * /roles/initialize:
 *   post:
 *     summary: Inicializace rolí
 *     tags: [Roles]
 *     description: Vytvoří výchozí sady rolí v systému.
 *     responses:
 *       200:
 *         description: Role byly úspěšně inicializovány.
 *       500:
 *         description: Došlo k chybě na serveru.
 */
router.post('/roles/initialize', RoleController.initializeRoles);

// Získání všech rolí
/**
 * @swagger
 * /roles/getAll:
 *   get:
 *     summary: Získání všech rolí
 *     tags: [Roles]
 *     description: Vrací seznam všech rolí v systému.
 *     responses:
 *       200:
 *         description: Seznam všech rolí.
 *       500:
 *         description: Došlo k chybě na serveru.
 */
router.get('/roles/getAll', RoleController.getAllRoles);

// Získání uživatelů podle názvu role
/**
 * @swagger
 * /roles/{roleName}/users:
 *   get:
 *     summary: Získání uživatelů podle role
 *     tags: [Roles]
 *     description: Vrací seznam uživatelů, kteří mají zadanou roli.
 *     parameters:
 *       - in: path
 *         name: roleName
 *         required: true
 *         schema:
 *           type: string
 *         description: Název role
 *     responses:
 *       200:
 *         description: Seznam uživatelů s danou rolí.
 *       500:
 *         description: Došlo k chybě na serveru.
 */
router.get('/roles/:roleName/users', RoleController.findUsersByRole);

// Přidání role k uživateli
/**
 * @swagger
 * /users/{userId}/role:
 *   post:
 *     summary: Přidání role k uživateli
 *     tags: [Roles]
 *     description: Přidělí zadanou roli uživateli.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID uživatele
 *       - in: body
 *         name: roleName
 *         required: true
 *         schema:
 *           type: string
 *         description: Název role k přidělení
 *     responses:
 *       200:
 *         description: Role byla úspěšně přidána uživateli.
 *       500:
 *         description: Došlo k chybě na serveru.
 */
router.put('/users/:userId/role', RoleController.setDefaultRole);

// Odebrání role uživateli a přidělení výchozí role
/**
 * @swagger
 * /users/{userId}/role:
 *   delete:
 *     summary: Odebrání role uživateli a přidělení výchozí role
 *     tags: [Roles]
 *     description: Odstraní aktuální roli uživatele a přidělí mu výchozí roli.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID uživatele
 *     responses:
 *       200:
 *         description: Role byla odebrána a výchozí role přidělena.
 *        500:
 *         description: Došlo k chybě na serveru.
 */
router.delete('/users/:userId/role', RoleController.removeRoleToUser);

module.exports = router;
