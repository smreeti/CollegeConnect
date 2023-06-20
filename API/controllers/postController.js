const Post = require("../models/Post");
const HttpStatus = require("../utils/HttpStatus.js");
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');
const { validateCreatePostForm } = require("../utils/ValidationUtil");
const { fetchFollowingUsers } = require("./userFollowingController");

const savePost = async (req, res) => {
    const { caption, imageUrl } = req.body;
    try {
        let errors = await validateCreatePostForm(imageUrl);
        const user = req.user;
        const isAdminUserType = user.userTypeId.code == "SUPER_ADMIN" || user.userTypeId.code == "ADMIN";

        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        await Post.create({
            caption,
            imageUrl,
            postedBy: req.user,
            isCollegePost: isAdminUserType ? "Y" : "N"
        });

        return setSuccessResponse(res, { message: "Post saved successfully" });
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const fetchAllPosts = async (req, res) => {
    const loggedInUser = req.user;
    try {
        const followingUsers = await fetchFollowingUsers(loggedInUser._id);

        const posts = await Post.find({
            postedBy: { $in: followingUsers },
            isCollegePost: 'Y'
        }).populate('postedBy')
            .sort({ createdDate: -1 })

        if (posts)
            return setSuccessResponse(res, "Posts fetched successfully", posts);
        else
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "Error fetching posts");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = { savePost, fetchAllPosts };