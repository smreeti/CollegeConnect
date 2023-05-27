const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const { validateLoginForm } = require('../utils/ValidationUtil.js')
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js')

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { username, password } = req.body;

    const errors = await validateLoginForm(username, password);

    if (errors.length > 0)
        return setErrorResponse(res, errors);

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
            // req.session.userId = user._id;
            // req.session.userType = user.userType;
            // req.session.isLoggedIn = true;
            user.password = undefined;
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);    
            return setSuccessResponse(res, "User logged in successfully", { user, token });
        } else {
            return setErrorResponse(res, "Sorry, your password was incorrect. Please double check your password.");
        }
    }

    console.log("User not found");
    return setErrorResponse(res, "Invalid username or password.");
}

module.exports = { login };