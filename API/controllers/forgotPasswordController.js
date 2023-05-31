require("dotenv").config();

const sendgridMail = require('@sendgrid/mail');
const { fetchUser } = require("./userController.js");
const { setErrorResponse } = require("../utils/Response");
const HttpStatus = require("../utils/HttpStatus");

sendgridMail.setApiKey(process.env.SEND_GRID_API_KEY);

const forgotPassword = (req, res) => {
    const { username } = req.body;
    const user = fetchUser(username);

    if (user) {
        const message = {
            from: "no-reply-collegeConnect@proton.me",
            to: "mool.smreeti@gmail.com",
            subject: "Sign up Success",
            html: "<h1>Welcome</h1>"
        }

        sendgridMail.send(message)
            .then(res => console.log('email sent'))
            .catch(error => console.log(error.message));

    } else {
        return setErrorResponse(res, HttpStatus.NOT_FOUND, "User not found.");
    }
}

module.exports = { forgotPassword };