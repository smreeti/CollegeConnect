const { signupUser } = require("./signupController.js");
const { fetchCollegeList } = require("./collegeInfoController.js");
const { login, verifyRefreshToken } = require("./loginController.js");
const {
  resetPassword,
  updatePassword,
} = require("./resetPasswordController.js");

const {
  savePost,
  fetchAllPosts,
  fetchPostDetails,
} = require("./postController.js");

const {
  searchUserByUsername,
  fetchUserDetails,
  editProfilePhoto,
  editProfile,
} = require("./userController.js");

const { fetchProfileDetails } = require("./profileController.js");

const {
  reportPost,
  fetchPostReports,
  handleApprovePostReports,
  handleRejectPostReports,
} = require("../controllers/reportPostController.js");

const {
  fetchUserNotifications,
} = require("../controllers/userNotificationController.js");

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
  fetchAllPosts,
  savePost,
  fetchAllPosts,
  fetchPostDetails,
  editProfilePhoto,
  editProfile,
  reportPost,
  fetchPostReports,
  handleApprovePostReports,
  handleRejectPostReports,
  fetchUserNotifications,
};
