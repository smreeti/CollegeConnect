const { setSuccessResponse, setErrorResponse } = require('../utils/Response');
const { fetchUserPosts } = require('./postController.js');
const { fetchUserMinDetails } = require('./userController.js');

const fetchProfileDetails = async (req, res) => {
    const { id } = req.body;

    const userDetail = await fetchUserMinDetails(id);
    const posts = await fetchUserPosts(id);
    if (userDetail)
        return setSuccessResponse(res, "Posts fetched successfully", {
            userDetail,
            posts
        });
    else
        return setErrorResponse(res, HttpStatus.NOT_FOUND, "No user found.");
}

module.exports = { fetchProfileDetails }