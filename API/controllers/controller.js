const { signupUser } = require("./signupController.js");
const { fetchCollegeList } = require("./collegeInfoController.js");
const { login, verifyRefreshToken } = require("./loginController.js");
const {
  resetPassword,
  updatePassword,
} = require("./resetPasswordController.js");

module.exports = {
  signupUser,
  fetchCollegeList,
  login,
  resetPassword,
  updatePassword,
  verifyRefreshToken,
};
