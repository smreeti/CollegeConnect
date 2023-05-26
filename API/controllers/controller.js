const { signupUser } = require('./signupcontroller.js');
const { fetchCollegeList } = require('./collegeInfoController.js');
const { login } = require('./loginController.js');

module.exports = {
    signupUser,
    fetchCollegeList,
    login
}