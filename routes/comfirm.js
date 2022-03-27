const express = require('express');
const authController = require('../controllers/auth4');
const router = express.Router();

router.post('/comfirm',authController.comfirm);

module.exports = router;