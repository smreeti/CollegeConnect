const User = require('../models/User.js');

const fetchUser = (username) => {
    const user = User.findOne({
        $or: [
            { email: username },
            { mobileNumber: username },
            { username: username }
        ]
    });
    return user ? user : null;
}

module.exports = { fetchUser };