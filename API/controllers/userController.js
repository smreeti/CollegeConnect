const User = require('../models/User.js');
const UserType = require('../models/UserType.js');
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');

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

const fetchAdminUser = async (collegeId) => {
    const adminUser = await User.findOne({
        userTypeId: {
            $in: await UserType.findOne({ code: "SUPER_ADMIN" })
        },
        collegeInfoId: collegeId
    });

    return adminUser;
};

const searchUserByUsername = async (req, res) => {
    try {
        const { username } = req.body;
        let usernamePattern = new RegExp("^" + username);

        const users = await User.find({
            username: { $regex: usernamePattern }
        }).select("username profilePicture");

        if (users.length === 0)
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "No user(s) found.");

        return setSuccessResponse(res, "Users fetched successfully", users);
    } catch (e) {
        console.log(e);
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while fetching users.");
    }
}

const fetchUserDetails = async (loggedInUser) => {
    try {
        const userDetail = await User.findOne({
            _id: loggedInUser._id
        }).select("firstName lastName username profilePicture");
        
        return userDetail;
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = { fetchUser, fetchAdminUser, searchUserByUsername, fetchUserDetails };