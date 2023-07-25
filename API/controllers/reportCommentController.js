const CommentReports = require("../models/CommentReports");
const PostComments = require("../models/PostComments");
const { PENDING } = require("../utils/ReportStatus");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response");

const reportComment = async (req, res) => {
    const { selectedPostCommentId, description } = req.body;
    const loggedInUser = req.user;

    try {
        const errors = await validateReportRequest(selectedPostCommentId, description);
        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        const selectedPostComment = await PostComments.findById(selectedPostCommentId);

        if (selectedPostComment) {
            await CommentReports.create({
                description,
                reportedBy: loggedInUser,
                postComment: selectedPostComment,
                status: PENDING,
                collegeInfoId: loggedInUser.collegeInfoId
            })
            return setSuccessResponse(res, "Comment reported successfully");
        } else
            return setErrorResponse(res, HttpStatus.NOT_FOUND, "Comment not found");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const validateReportRequest = async (selectedPostCommentId, description) => {
    const errors = {};

    if (!selectedPostCommentId)
        errors.push("Comment must be selected");

    if (!description)
        errors.push("Description is required");

    return errors;
}

module.exports = { reportComment }