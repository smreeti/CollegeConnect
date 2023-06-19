const Post = require("../models/Post");
const HttpStatus = require("../utils/HttpStatus.js");
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');

const savePost = async (req, res) => {
    const { caption, imageUrl } = req.body;
    try {
        await Post.create({
            caption,
            imageUrl,
            postedBy: req.user
        });

        return setSuccessResponse(res, { message: "Post saved successfully" });
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = { savePost };