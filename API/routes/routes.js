const express = require('express');
const router = express.Router();
const { signupUser, fetchCollegeList } = require('../controllers/controller.js');

router.post('/signupUser', signupUser);
router.get('/fetchCollegeList', fetchCollegeList);

module.exports = router;