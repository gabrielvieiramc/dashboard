const express = require ('express');
const AuthController = require ('../controllers/AuthController.js');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', AuthController.getUserAuthenticated);


module.exports = router;