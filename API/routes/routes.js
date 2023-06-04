const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware.js');

const {
    signupUser,
    fetchCollegeList,
    login,
    resetPassword,
    updatePassword
} = require('../controllers/controller.js');

const {
    API_TO_FETCH_COLLEGE_INFO,
    API_TO_SIGNUP_USER,
    API_TO_LOGIN_USER,
    API_TO_RESET_PASSWORD,
    API_TO_UPDATE_PASSWORD
} = require('../utils/APIRequestUrl.js');

router.get(API_TO_FETCH_COLLEGE_INFO, fetchCollegeList);
router.post(API_TO_SIGNUP_USER, signupUser);

router.post(API_TO_LOGIN_USER, login);

//Forgot Password Requests 
router.post(API_TO_RESET_PASSWORD, resetPassword); //sends token in email
router.post(API_TO_UPDATE_PASSWORD, updatePassword); //validate the token and update password

module.exports = router;