require("dotenv").config();
const mongoose = require('mongoose');
const UserType = require('../models/UserType.js');
const CollegeInfo = require('../models/CollegeInfo.js');
const CollegeInfoData = require("../utils/preSetups/CollegeInfoData.js");
const UserTypeData = require("../utils/preSetups/UserTypeData.js");
const EmailAction = require("../models/EmailAction.js");
const EmailActionData = require("../utils/preSetups/EmailActionData.js");

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
async function seedInitialData() {
    const userTypeCount = await UserType.countDocuments();
    const collegeInfoCount = await CollegeInfo.countDocuments();
    const emailActionCount = await EmailAction.countDocuments();

    if (userTypeCount == 0)
        await UserType.create(UserTypeData);

    if (collegeInfoCount == 0)
        await CollegeInfo.create(CollegeInfoData);

    if (emailActionCount == 0)
        await EmailAction.create(EmailActionData);
}

module.exports = { dbConnect, seedInitialData };
