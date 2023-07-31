const API_TO_FETCH_COLLEGE_INFO = "/fetchCollegeList";

const API_TO_SIGNUP_USER = "/signupUser";

const API_TO_LOGIN_USER = "/login";

const API_TO_RESET_PASSWORD = "/resetPassword";

const API_TO_UPDATE_PASSWORD = "/updatePassword";

const API_TO_VERIFY_REFRESH_TOKEN = "/refresh";

const API_TO_SAVE_POST = "/savePost";
const API_TO_FETCH_ALL_POSTS = "/allPosts";

const API_TO_SEARCH_USERS = "/searchUser";
const API_TO_FETCH_PROFILE_DETAILS = "/profileDetails";

const API_TO_FETCH_USER_DETAILS = "/userDetails";
const API_TO_EDIT_PROFILE_PHOTO = "/editProfilePhoto";
const API_TO_EDIT_PROFILE = "/editProfile";

const API_TO_FETCH_POST_DETAILS = "/postDetails";
const API_TO_REPORT_POST = "/reportPost";
const API_TO_FETCH_POST_REPORTS = "/fetchPostReports";
const API_TO_APPROVE_POST_REPORTS = "/approvePostReports";
const API_TO_REJECT_POST_REPORTS = "/rejectPostReports";

const API_TO_FETCH_NOTIFICATIONS = "/fetchNotifications";

const API_TO_SAVE_COMMENTS = "/saveComments";
const API_TO_FETCH_POST_COMMENTS = "/fetchPostComments";

const API_TO_LIKE_UNLIKE_POST = "/like/:id";

const API_TO_FETCH_POST_LIKES = "/fetchPostLikes";

const API_TO_DELETE_COMMENT = "/deleteComment";
const API_TO_DELETE_POST = "/deletePost/:id";

const API_TO_FOLLOW_USER = "/follow";
const API_TO_UNFOLLOW_USER = "/unfollow/:followingUserId";

const API_TO_FETCH_FOLLOWING_USERS = "/followingUsers/:userId";
const API_TO_FETCH_FOLLOWERS = "/followers/:userId";
const API_TO_REMOVE_FOLLOWERS = "/removeFollower/:followerUserId";

const API_TO_REPORT_COMMENT = "/reportComment";
const API_TO_FETCH_COMMENT_REPORTS = "/fetchCommentReports";
const API_TO_APPROVE_COMMENT_REPORTS = "/approveCommentReports";
const API_TO_REJECT_COMMENT_REPORTS = "/rejectCommentReports";

const API_TO_FETCH_DATA_FOR_DOUGNNUT_CHART = "/doughnutChart";

module.exports = {
  API_TO_FETCH_COLLEGE_INFO,
  API_TO_SIGNUP_USER,
  API_TO_LOGIN_USER,
  API_TO_RESET_PASSWORD,
  API_TO_UPDATE_PASSWORD,
  API_TO_VERIFY_REFRESH_TOKEN,
  API_TO_SAVE_POST,
  API_TO_FETCH_ALL_POSTS,
  API_TO_SEARCH_USERS,
  API_TO_FETCH_PROFILE_DETAILS,
  API_TO_FETCH_USER_DETAILS,
  API_TO_EDIT_PROFILE_PHOTO,
  API_TO_EDIT_PROFILE,
  API_TO_FETCH_POST_DETAILS,
  API_TO_REPORT_POST,
  API_TO_LIKE_UNLIKE_POST,
  API_TO_FETCH_POST_REPORTS,
  API_TO_APPROVE_POST_REPORTS,
  API_TO_REJECT_POST_REPORTS,
  API_TO_FETCH_NOTIFICATIONS,
  API_TO_SAVE_COMMENTS,
  API_TO_FETCH_POST_COMMENTS,
  API_TO_FETCH_POST_LIKES,
  API_TO_DELETE_COMMENT,
  API_TO_DELETE_POST,
  API_TO_FOLLOW_USER,
  API_TO_UNFOLLOW_USER,
  API_TO_FETCH_FOLLOWING_USERS,
  API_TO_FETCH_FOLLOWERS,
  API_TO_REMOVE_FOLLOWERS,
  API_TO_REPORT_COMMENT,
  API_TO_FETCH_COMMENT_REPORTS,
  API_TO_APPROVE_COMMENT_REPORTS,
  API_TO_REJECT_COMMENT_REPORTS,
  API_TO_FETCH_DATA_FOR_DOUGNNUT_CHART
};
