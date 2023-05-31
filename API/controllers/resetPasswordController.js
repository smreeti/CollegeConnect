require("dotenv").config();

const crypto = require('crypto');
const sendgridMail = require('@sendgrid/mail');
const HttpStatus = require("../utils/HttpStatus.js");
const { template, subject, generateResetPasswordEmail } = require('../utils/EmailTemplates/ResetPassword.js');
const { fetchUser } = require("./userController.js");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response.js");
const { fetchEmailAction } = require("./emailActionController.js");
const { RESET_PASSWORD } = require("../utils/EmailActionConstants.js");
const { createEmailToken } = require("./emailTokenController.js");

sendgridMail.setApiKey(process.env.SEND_GRID_API_KEY);

const resetPassword = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await fetchUser(username);

        if (!user)
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "User not found.");

        const randomToken = crypto.randomBytes(32).toString("hex");
        const expiryDate = Date.now() + 3600000; // current date + 1 hour

        const emailAction = await fetchEmailAction(RESET_PASSWORD);
        await createEmailToken(randomToken, expiryDate, user._id, emailAction._id);

        const resetPasswordEmail = generateResetPasswordEmail(user.email, randomToken);

        await sendEmail(resetPasswordEmail);
        return setSuccessResponse(res, "Reset Password Email Sent");
    } catch (error) {
        console.error(error.message);
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
    }
};

const sendEmail = async (message) => {
    await sendgridMail.send(message);
};

module.exports = { resetPassword };