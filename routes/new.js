const express = require('express');
const authController = require('../controllers/auth6');
const router = express.Router();

router.post('/new',authController.new);

module.exports = router;