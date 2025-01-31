// src/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../core/middlewares/authMiddleware');
const adminMiddleware = require('../core/middlewares/adminMiddleware'); // Importe o middleware de admin

const router = express.Router();

// Aplica o authMiddleware para todas as rotas de /users
router.use(authMiddleware);

// Aplica o adminMiddleware para as rotas que só administradores podem acessar
router.post('/', adminMiddleware, UserController.createUser);
router.put('/:id', adminMiddleware, UserController.updateUser);
router.delete('/:id', adminMiddleware, UserController.deleteUser);
router.get('/', adminMiddleware, UserController.getAllUsers);

module.exports = router;