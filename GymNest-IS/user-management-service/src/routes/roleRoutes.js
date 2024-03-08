const express = require('express');
const RoleController = require('../controllers/RoleController');
const router = express.Router();

router.post('/roles/initialize', RoleController.initializeRoles);
router.get('/roles', RoleController.getAllRoles);
router.get('/roles/:roleName/users', RoleController.findUsersByRole);
router.put('/users/:userId/role', RoleController.setDefaultRole);
router.delete('/users/:userId/role', RoleController.removeRoleToUser);

module.exports = router;
