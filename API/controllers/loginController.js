const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const {
    validateLoginForm
} = require('../utils/ValidationUtil.js')

const login = async (req, res) => {
    const { username, password } = req.body;

    const errors = await validateLoginForm(username, password);

    if (errors.length > 0)
        return res.status(404).json({ error: errors });

    const user = await User.findOne({
        $or: [
            { email: username },
            { mobileNumber: username },
            { username: username }
        ]
    });

    console.log("user", user);

    if (user) {

        let same = await bcrypt.compare(password, user.password);
        if (same) { //if passwords match
            // req.session.userId = user._id;
            // req.session.userType = user.userType;
            // req.session.isLoggedIn = true;
            return res.json({ message: "User logged in successfully", user });
        } else {
            return res.status(404).json({ error: "Sorry, your password was incorrect. Please double check your password." });
        }
    }

    console.log("User not found");
    return res.status(404).json({ error: "User not found" });
}

module.exports = { login };