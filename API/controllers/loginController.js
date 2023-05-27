const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const HttpStatus = require('../utils/HttpStatus.js');
const { validateLoginForm } = require('../utils/ValidationUtil.js');
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { username, password } = req.body;

    const errors = await validateLoginForm(username, password);

    if (errors.length > 0)
        return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

    const user = await User.findOne({
        $or: [
            { email: username },
            { mobileNumber: username },
            { username: username }
        ]
    });

    if (user) {
        let same = await bcrypt.compare(password, user.password);
        if (same) { //if passwords match
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            user.password = undefined;
            return setSuccessResponse(res, "User logged in successfully", { token, user });
        } else {
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, "Sorry, your password was incorrect. Please double check your password.");
        }
    }

    console.log("User not found");
    return setErrorResponse(res, HttpStatus.BAD_REQUEST, "Invalid username or password.");
}

module.exports = { login };