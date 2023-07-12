const { signupUser } = require("./signupController.js");
const { fetchCollegeList } = require("./collegeInfoController.js");
const { login, verifyRefreshToken } = require("./loginController.js");
const {
  resetPassword,
  updatePassword,
} = require("./resetPasswordController.js");
const { savePost, fetchPostDetails } = require("./postController.js");
const {
  searchUserByUsername,
  fetchUserDetails,
} = require("./userController.js");
const { fetchProfileDetails } = require("./profileController.js");

module.exports = {
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
  fetchPostDetails,
};
