require("dotenv").config();
const mongoose = require('mongoose');

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
    // Add your code for seeding initial data here
}

module.exports = { dbConnect, seedInitialData };
