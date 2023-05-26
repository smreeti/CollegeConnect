const CollegeInfo = require('../models/CollegeInfo.js');

const fetchCollegeList = async (req, res) => {
    try {
        const collegeList = await CollegeInfo.find();
        return res.json(collegeList);
    } catch (error) {
        throw new Error("Error fetching college list: " + error.message);
    }
};

module.exports = { fetchCollegeList };