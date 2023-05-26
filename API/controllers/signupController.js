const User = require('../models/User.js');
const UserType = require('../models/UserType.js');
const CollegeInfo = require('../models/CollegeInfo.js');
const {
    validateUser
} = require('../utils/ValidationUtil.js')

const signupUser = async (req, res) => {
    const {
        collegeInfoId,
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password,
        userType
    } = req.body;

    const errors = await validateUser(req, res);
    const collegeInfo = await fetchCollegeInfo(collegeInfoId, errors);
    const userTypeId = await fetchUserType(userType);

    if (errors.length > 0)
        return res.status(404).json({ error: errors });

    try {
        await User.create({
            collegeInfoId: collegeInfo,
            userTypeId,
            firstName,
            lastName,
            email,
            mobileNumber,
            username,
            password
        });

        return res.json({ message: "User saved successfully" });
    } catch (error) {
        return res.status(404).json({ error: errors[0] });
    }
};

const fetchCollegeInfo = async (collegeInfoId, errors) => {
    let collegeInfo;
    try {
        collegeInfo = await CollegeInfo.findById(collegeInfoId);
        if (!collegeInfo)
            errors.push("College info not found");
    } catch (error) {
        errors.push("Error finding college info");
    }
    return collegeInfo;
}

const fetchUserType = async (userType) => {
    const userTypeId = await UserType.findOne({ name: userType });
    if (!userType)
        errors.push("User type not found");
    return userTypeId;
}

module.exports = { signupUser };