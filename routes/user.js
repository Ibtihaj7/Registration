const express = require('express');
const authController = require('../controllers/auth2');
const router = express.Router();

router.post('/user',authController.register);

module.exports = router;