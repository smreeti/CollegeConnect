const User = require("../models/User");
const UserFollowing = require("../models/UserFollowing");
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');

const fetchFollowingUsers = async (userId) => {
    return await UserFollowing.find({ userId: userId, status: 'Y' }).distinct('followingUserId');
}

const followUser = async (req, res) => {
    const loggedInUser = req.user;
    const { followingUserId } = req.body;

    try {
        const user = await User.findById(followingUserId);
        if (user) {
            await UserFollowing.create({
                userId: loggedInUser,
                followingUserId: loggedInUser
            });
            return setSuccessResponse(res, "Successfully followed: " + user.username);
        }
    } catch (e) {
        return setErrorResponse(res, "Something went wrong");
    }
}

module.exports = { fetchFollowingUsers, followUser };