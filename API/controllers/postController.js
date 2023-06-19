const Post = require("../models/Post");
const HttpStatus = require("../utils/HttpStatus.js");
const { setSuccessResponse, setErrorResponse } = require('../utils/Response.js');
const { validateCreatePostForm } = require("../utils/ValidationUtil");

const savePost = async (req, res) => {
    const { caption, imageUrl } = req.body;
    try {
        let errors = await validateCreatePostForm(imageUrl);

        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

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