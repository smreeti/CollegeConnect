const { setSuccessResponse, setErrorResponse } = require('../utils/Response');
const { fetchUserPosts } = require('./postController.js');
const { fetchUserMinDetails } = require('./userController.js');

const fetchProfileDetails = async (req, res) => {
    const loggedInUser = req.user;

    const userDetail = await fetchUserMinDetails(loggedInUser);
    const posts = await fetchUserPosts(loggedInUser);

    if (userDetail)
        return setSuccessResponse(res, "Posts fetched successfully", {
            userDetail,
            posts
        });
    else
        return setErrorResponse(res, HttpStatus.NOT_FOUND, "No user found.");
}   

module.exports = { fetchProfileDetails }