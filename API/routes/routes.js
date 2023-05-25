const express = require('express');
const router = express.Router();
const {signup, signupUser } = require('../controllers/controller.js');

router.get('/signup', signup);
router.post('/signupUser', signupUser);

module.exports = router;