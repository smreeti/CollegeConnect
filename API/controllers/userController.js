const User = require('../models/User.js');
const UserType = require('../models/UserType.js');
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');
const { validateImage } = require('../utils/ValidationUtil.js');

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
        const loggedInUser = req.user;

        let usernamePattern = new RegExp("^" + username);

        const users = await User.find({
            username: { $regex: usernamePattern },
            collegeInfoId: loggedInUser.collegeInfoId
        }).select("username profilePicture");

        if (users.length === 0)
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "No user(s) found.");

        return setSuccessResponse(res, "Users fetched successfully", users);
    } catch (e) {
        console.log(e);
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while fetching users.");
    }
}

const fetchUserMinDetails = async (loggedInUser) => {
    try {
        const userDetail = await User.findOne({
            _id: loggedInUser._id
        }).select("firstName lastName username profilePicture");

        return userDetail;
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const fetchUserDetails = async (req, res) => {
    const loggedInUser = req.user;
    try {
        const userDetail = await User.findOne({
            _id: loggedInUser._id
        }).populate('collegeInfoId');

        userDetail.password = undefined;
        return setSuccessResponse(res, "User detail fetched successfully", userDetail);
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}
const editProfilePhoto = async (req, res) => {
    const loggedInUser = req.user;
    const { imageUrl } = req.body;

    try {
        let errors = await validateImage(imageUrl);
        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        await User.findByIdAndUpdate(loggedInUser._id, {
            profilePicture: imageUrl
        });

        return setSuccessResponse(res, { message: "Profile picture saved successfully" });
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

module.exports = {
    fetchUser,
    fetchAdminUser,
    searchUserByUsername,
    fetchUserMinDetails,
    fetchUserDetails,
    editProfilePhoto
};