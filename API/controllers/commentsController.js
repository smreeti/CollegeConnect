const PostComments = require("../models/PostComments");
const HttpStatus = require("../utils/HttpStatus");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response");
const { fetchPostById } = require("./postController");

const saveComments = async (req, res) => {
    const { comment, postId } = req.body;
    const user = req.user;

    const post = await fetchPostById(postId);

    if (post) {
        await PostComments.create({
            comment,
            commentedBy: user,
            post
        });
        return setSuccessResponse(res, HttpStatus.CREATED, "Comment added successfully.");
    } else {
        return setErrorResponse(res, HttpStatus.NOT_FOUND, "Post not found.");
    }
}

const fetchPostComments = async (req, res) => {
    const { postId } = req.body;

    const postComments = await PostComments.find({
        post: postId
    })
        .populate({
            path: "commentedBy",
            select: "username"
        })
        .select("comment createdDate")
        .sort({ createdDate: -1 });

    if (postComments)
        return setSuccessResponse(res, "Post comments fetched", postComments);
    else
        return setErrorResponse(res, HttpStatus.NOT_FOUND, "Comments empty");
}

module.exports = { saveComments, fetchPostComments };