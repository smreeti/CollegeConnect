const { signupUser } = require('./signupController.js');
const { fetchCollegeList } = require('./collegeInfoController.js');
const { login } = require('./loginController.js');
const { forgotPassword } = require('./forgotPasswordController.js');

module.exports = {
    signupUser,
    fetchCollegeList,
    login,
    forgotPassword
}