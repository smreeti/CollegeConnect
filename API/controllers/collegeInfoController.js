const CollegeInfo = require('../models/CollegeInfo.js');
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');

const fetchCollegeList = async (req, res) => {
    try {
        const collegeList = await CollegeInfo.find();
        return setSuccessResponse(res, "College Info List fetched successfully", collegeList);
    } catch (error) {
        return setErrorResponse(res, "Error fetching college list");
    }
};

module.exports = { fetchCollegeList };