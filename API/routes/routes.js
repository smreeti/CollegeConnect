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
  searchUserByUsername,
  fetchProfileDetails,
  fetchUserDetails,
} = require("../controllers/controller.js");

const {
  API_TO_FETCH_COLLEGE_INFO,
  API_TO_SIGNUP_USER,
  API_TO_LOGIN_USER,
  API_TO_UPDATE_PASSWORD,
  API_TO_VERIFY_REFRESH_TOKEN,
  API_TO_RESET_PASSWORD,
  API_TO_SAVE_POST,
  API_TO_FETCH_ALL_POSTS,
  API_TO_SEARCH_USERS,
  API_TO_FETCH_PROFILE_DETAILS,
  API_TO_FETCH_USER_DETAILS,
  API_TO_EDIT_PROFILE_PHOTO,
  API_TO_EDIT_PROFILE,
  API_TO_FETCH_POST_DETAILS,
  // API_TO_VIEW_FOLLOWERS,
} = require("../utils/APIRequestUrl.js");

const { setSuccessResponse } = require("../utils/Response.js");
const { fetchAllPosts, fetchPostDetails } = require("../controllers/postController.js");
const {
  editProfilePhoto,
  editProfile,
} = require("../controllers/userController.js");



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
router.post(API_TO_FETCH_ALL_POSTS, authMiddleware, fetchAllPosts);

router.post(API_TO_SEARCH_USERS, authMiddleware, searchUserByUsername);
router.post(API_TO_FETCH_PROFILE_DETAILS, authMiddleware, fetchProfileDetails);

router.post(API_TO_FETCH_USER_DETAILS, authMiddleware, fetchUserDetails);
router.post(API_TO_EDIT_PROFILE_PHOTO, authMiddleware, editProfilePhoto);

router.post(API_TO_EDIT_PROFILE, authMiddleware, editProfile);

// router.post(API_TO_VIEW_FOLLOWERS, authMiddleware);
router.post(API_TO_FETCH_POST_DETAILS, authMiddleware, fetchPostDetails);

module.exports = router;
