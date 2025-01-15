const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

module.exports = router;