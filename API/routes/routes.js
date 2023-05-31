const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware.js');

const {
    signupUser,
    fetchCollegeList,
    login
} = require('../controllers/controller.js');

const {
    API_TO_FETCH_COLLEGE_INFO,
    API_TO_SIGNUP_USER,
    API_TO_LOGIN_USER
} = require('../utils/APIRequestUrl.js');

router.get(API_TO_FETCH_COLLEGE_INFO, fetchCollegeList);
router.post(API_TO_SIGNUP_USER, signupUser);

router.post(API_TO_LOGIN_USER, login);

module.exports = router;