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
                followingUserId: user
            });
            return setSuccessResponse(res, "Successfully followed: " + user.username);
        }
    } catch (e) {
        return setErrorResponse(res, "Something went wrong");
    }
}

const checkIfFollowing = async (userId, followingUserId) => {
    const result = await UserFollowing.findOne({
        userId: userId,
        followingUserId: followingUserId
    });
    return result !== null;
};

const unfollowUser = async (req, res) => {
    const loggedInUser = req.user;
    const followingUserId = req.params.followingUserId;

    console.log(req.params);
    try {
        const followingUser = await User.findById(followingUserId);
        if (followingUser) {
            const query = {
                userId: loggedInUser,
                followingUserId: followingUser
            };
            await UserFollowing.findOneAndDelete(query);
        }

        return setSuccessResponse(res, "Successfully unfollowed: " + followingUser.username);
    } catch (e) {
        return setErrorResponse(res, "Something went wrong");
    }

}

module.exports = { fetchFollowingUsers, followUser, checkIfFollowing, unfollowUser };