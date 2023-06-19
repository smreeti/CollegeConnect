const { signupUser } = require("./signupController.js");
const { fetchCollegeList } = require("./collegeInfoController.js");
const { login, verifyRefreshToken } = require("./loginController.js");
const { resetPassword, updatePassword } = require("./resetPasswordController.js");
const { savePost } = require("./postController.js");

module.exports = {
  signupUser,
  fetchCollegeList,
  login,
  resetPassword,
  updatePassword,
  verifyRefreshToken,
  savePost
};
