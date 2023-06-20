const UserFollowing = require("../models/UserFollowing");

const fetchFollowingUsers = async (userId) => {
    return await UserFollowing.find({ userId: userId, status: 'Y' }).distinct('followingUserId');
}

module.exports = { fetchFollowingUsers };