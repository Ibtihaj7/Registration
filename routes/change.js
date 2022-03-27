const express = require('express');
const authController = require('../controllers/auth5');
const router = express.Router();

router.post('/change',authController.change);

module.exports = router;