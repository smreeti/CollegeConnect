require("dotenv").config();
const mongoose = require('mongoose');
const UserType = require('../models/UserType.js');
const CollegeInfo = require('../models/CollegeInfo.js');
const CollegeInfoData = require("../utils/preSetups/CollegeInfoData.js");
const UserTypeData = require("../utils/preSetups/UserTypeData.js");
const EmailAction = require("../models/EmailAction.js");
const EmailActionData = require("../utils/preSetups/EmailActionData.js");
const User = require("../models/User.js");

// Function to connect to MongoDB server
const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to the MongoDB database");
    } catch (error) {
        console.log("Connection to MongoDB failed with error:", error);
    }
};

// Insert data in the database when the server starts
const seedInitialData = async () => {
    const userTypeCount = await UserType.countDocuments();
    const collegeInfoCount = await CollegeInfo.countDocuments();
    const emailActionCount = await EmailAction.countDocuments();

    if (userTypeCount == 0)
        await UserType.create(UserTypeData);

    if (collegeInfoCount == 0)
        await CollegeInfo.create(CollegeInfoData);

    if (emailActionCount == 0)
        await EmailAction.create(EmailActionData);

    await createSuperAdminForColleges();
}

const createSuperAdminForColleges = async () => {
    const colleges = await CollegeInfo.find();
    const adminUserType = await UserType.findOne({ code: 'SUPER_ADMIN' });

    for (const college of colleges) {
        const existingSuperAdmin = await User.findOne({
            collegeInfoId: college._id,
            userTypeId: adminUserType._id,
        });

        if (!existingSuperAdmin) {
            saveSuperAdmin(adminUserType._id, college);
        }
    }
}

const saveSuperAdmin = async (adminUserType, collegeInfo) => {
    const superAdmin = new User({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@' + collegeInfo.name.toLowerCase().replace(/\s+/g, '') + '.com',
        mobileNumber: generateRandomMobileNumber(),
        username: 'superadmin' + collegeInfo.name.toLowerCase().replace(/\s+/g, ''),
        password: 'Password1@',
        userTypeId: adminUserType._id,
        collegeInfoId: collegeInfo._id,
    });

    await superAdmin.save();
}

const generateRandomMobileNumber = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return randomNumber.toString().substring(0, 10);
}

module.exports = { dbConnect, seedInitialData };
