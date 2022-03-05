const express = require('express');
const router = express().Router();
const c = require('../controllers/auth2');
router.post('/user',c.login);
module.exports = router;