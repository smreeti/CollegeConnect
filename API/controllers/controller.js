const { signupUser } = require('./signupController.js');
const { fetchCollegeList } = require('./collegeInfoController.js');
const { login } = require('./loginController.js');
const { resetPassword } = require('./resetPasswordController.js');

module.exports = {
    signupUser,
    fetchCollegeList,
    login,
    resetPassword
}