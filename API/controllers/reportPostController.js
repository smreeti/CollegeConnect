const PostReports = require("../models/PostReports.js");
const HttpStatus = require("../utils/HttpStatus");
const { PENDING } = require("../utils/ReportStatus.js");
const { setSuccessResponse, setErrorResponse } = require("../utils/Response");
const { fetchPostById } = require("./postController");

const reportPost = async (req, res) => {

    const { selectedPostId, description } = req.body;
    try {
        const errors = await validateReportRequest(selectedPostId, description);
        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        const selectedPost = await fetchPostById(selectedPostId);

        if (selectedPost) {
            await PostReports.create({
                description,
                reportedBy: req.user,
                post: selectedPost,
                status: PENDING
            })
            return setSuccessResponse(res, "Post reported successfully");
        } else
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "Post not found");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const validateReportRequest = async (selectedPostId, description) => {
    const errors = {};

    if (!selectedPostId)
        errors.push("Post must be selected");

    if (!description)
        errors.push("Description is required");

    return errors;
}

module.exports = { reportPost };