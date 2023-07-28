const Post = require("../models/Post");
const User = require("../models/User");
const UserType = require("../models/UserType");
const HttpStatus = require("../utils/HttpStatus");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response");

const fetchDataForDoughnutChart = async (req, res) => {
    const loggedInUser = req.user;
    const { collegeInfoId, userTypeId } = loggedInUser;

    if (loggedInUser.userTypeId.code == "SUPER_ADMIN") {
        const regularUserType = await UserType.findOne({ code: 'REGULAR_USER' });

        if (!regularUserType)
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "Regular users not found");

        const totalRegularUsers = await fetchTotalRegularUsers(collegeInfoId._id, regularUserType._id);
        const totalCollegePosts = await fetchTotalCollegePosts(collegeInfoId._id, userTypeId._id);
        const totalUserPosts = await fetchTotalUserPosts(collegeInfoId._id, regularUserType._id);

        const doughnutChartData = {
            totalRegularUsers,
            totalCollegePosts,
            totalUserPosts,
            totalPosts: totalCollegePosts + totalUserPosts
        }

        return setSuccessResponse(res, HttpStatus.OK, doughnutChartData);
    } else {
        return setErrorResponse(res, HttpStatus.BAD_REQUEST, "Only admin can access this page");
    }
}

const fetchTotalRegularUsers = async (collegeInfoId, regularUserTypeId) => {


    const totalRegularUsers = await User.countDocuments({
        userTypeId: regularUserTypeId,
        collegeInfoId
    });
    return totalRegularUsers;
}

const fetchTotalCollegePosts = async (collegeInfoId, adminUserTypeId) => {

    try {
        const totalCollegePostsCount = await Post.countDocuments({
            isCollegePost: "Y"
        }).populate({
            path: "postedBy",
            match: {
                collegeInfoId: collegeInfoId,
                userTypeId: adminUserTypeId
            },
        });
        return totalCollegePostsCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const fetchTotalUserPosts = async (collegeInfoId, regularUserTypeId) => {

    try {
        const totalUserPostsCount = await Post.countDocuments({
            isCollegePost: "N"
        }).populate({
            path: "postedBy",
            match: {
                collegeInfoId: collegeInfoId,
                userTypeId: regularUserTypeId
            },
        });
        return totalUserPostsCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


module.exports = {
    fetchDataForDoughnutChart
}