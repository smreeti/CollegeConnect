const PostComments = require("../models/PostComments");
const HttpStatus = require("../utils/HttpStatus");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response");
const { fetchPostById } = require("./postController");

const saveComments = async (req, res) => {
    const { comment, postId } = req.body;
    const user = req.user;

    const post = await fetchPostById(postId);

    console.log(comment)
    console.log(postId)
    console.log(user)
    console.log(post)




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

module.exports = { saveComments };