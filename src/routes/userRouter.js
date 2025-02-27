// src/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController.js');
const authMiddleware = require('../core/middlewares/authMiddleware.js');
const adminMiddleware = require('../core/middlewares/adminMiddleware.js'); // Importe o middleware de admin

const router = express.Router();

// Aplica o authMiddleware e adminMiddleware a todas as rotas de /users
router.use(authMiddleware); // Verifica se o usuário está autenticado
router.use(adminMiddleware);

// Aplica o adminMiddleware para as rotas que só administradores podem acessar
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

module.exports = router;