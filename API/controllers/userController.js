const User = require('../models/User.js');
const UserType = require('../models/UserType.js');

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

module.exports = { fetchUser, fetchAdminUser };