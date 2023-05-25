require("dotenv").config();
const mongoose = require('mongoose');
const UserType= require('../models/UserType.js');
const CollegeInfo= require('../models/CollegeInfo.js');

// Create an array of college data
const collegeData = [
    {
        name: 'Conestoga College',
        mobileNumber: '(519) 748-5220',
        city: 'Kitchener',
        address: '299 Doon Valley Dr',
        postalCode: 'N2G 4M4'
    },
    {
        name: 'Humber College',
        mobileNumber: '(416) 675-3111',
        city: 'Etobicoke',
        address: '205 Humber College Blvd',
        postalCode: 'M9W 5L7'
    }
];

const userTypeData = [
    {
        name: "Admin",
        code: "ADMIN"
    },
    {
        name: "Regular user",
        code: "REGULAR_USER"
    }
]

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
    await UserType.create(userTypeData);
    await CollegeInfo.create(collegeData);
}

module.exports = { dbConnect, seedInitialData };
