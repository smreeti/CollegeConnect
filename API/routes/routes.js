const express = require('express');
const router = express.Router();
const {signupUser } = require('../controllers/controller.js');

router.post('/signupUser', signupUser);

module.exports = router;