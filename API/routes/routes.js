const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware.js");

const {
  signupUser,
  fetchCollegeList,
  login,
  resetPassword,
  updatePassword,
  verifyRefreshToken,
  savePost,
} = require("../controllers/controller.js");

const {
  API_TO_FETCH_COLLEGE_INFO,
  API_TO_SIGNUP_USER,
  API_TO_LOGIN_USER,
  API_TO_UPDATE_PASSWORD,
  API_TO_VERIFY_REFRESH_TOKEN,
  API_TO_RESET_PASSWORD,
  API_TO_SAVE_POST,
} = require("../utils/APIRequestUrl.js");
const { setSuccessResponse } = require("../utils/Response.js");

router.get(API_TO_FETCH_COLLEGE_INFO, fetchCollegeList);
router.post(API_TO_SIGNUP_USER, signupUser);

router.post(API_TO_LOGIN_USER, login);
router.post(API_TO_VERIFY_REFRESH_TOKEN, verifyRefreshToken);

//Forgot Password Requests
router.post(API_TO_RESET_PASSWORD, resetPassword); //sends token in email
router.post(API_TO_UPDATE_PASSWORD, updatePassword); //validate the token and update password

router.post("/protected", authMiddleware, (req, res) => {
  return setSuccessResponse(res, "Protected List");
});

router.post(API_TO_SAVE_POST, authMiddleware, savePost);

module.exports = router;
