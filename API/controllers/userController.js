const User = require('../models/User.js');
const UserType = require('../models/UserType.js');
const { BLOCK_USER } = require('../utils/EmailActionConstants.js');
const { generateBlockUserEmail } = require('../utils/EmailTemplates/BlockUser.js');
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');
const { validateImage, validateUser } = require('../utils/ValidationUtil.js');
const { fetchEmailAction } = require('./emailActionController.js');
const sendgridMail = require("@sendgrid/mail");

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
        }).select("username profilePicture firstName lastName");

        if (users.length === 0)
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "No user(s) found.");

        return setSuccessResponse(res, "Users fetched successfully", users);
    } catch (e) {
        console.log(e);
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while fetching users.");
    }
}

const fetchUserMinDetails = async (id) => {
    const userDetail = await User.findById(id)
        .select("firstName lastName username profilePicture bio followers following");
    return userDetail;
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

        const user = await User.findByIdAndUpdate(loggedInUser._id, {
            profilePicture: imageUrl
        }, { new: true });

        return setSuccessResponse(res, { message: "Profile picture saved successfully" }, user);
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

const editProfile = async (req, res) => {
    const loggedInUser = req.user;
    const {
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        bio
    } = req.body;

    req.body.isEdit = true;
    req.body.loggedInUserId = loggedInUser._id;

    try {
        const errors = await validateUser(req);

        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        const user = await User.findByIdAndUpdate(loggedInUser._id, {
            firstName,
            lastName,
            email,
            mobileNumber,
            username,
            bio
        }, { new: true });

        return setSuccessResponse(res, { message: "Profile updated successfully" }, user);
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const blockUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            status: 'BLOCKED'
        }, { new: true });

        const blockUserEmail = generateBlockUserEmail(
            user.username,
            user.email,
            "cdvs"
        );
        await sendEmail(blockUserEmail);

        return setSuccessResponse(res, { message: "User blocked successfully" });
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const sendEmail = async (message) => {
    await sendgridMail.send(message);
};

module.exports = {
    fetchUser,
    fetchAdminUser,
    searchUserByUsername,
    fetchUserMinDetails,
    fetchUserDetails,
    editProfilePhoto,
    editProfile,
    blockUser
};