const PostReports = require("../models/PostReports.js");
const HttpStatus = require("../utils/HttpStatus");
const { PENDING, APPROVED, REJECTED } = require("../utils/ReportStatus.js");
const { setSuccessResponse, setErrorResponse } = require("../utils/Response");
const { fetchPostById } = require("./postController");

const reportPost = async (req, res) => {

    const { selectedPostId, description } = req.body;
    const loggedInUser = req.user;

    try {
        const errors = await validateReportRequest(selectedPostId, description);
        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        const selectedPost = await fetchPostById(selectedPostId);

        if (selectedPost) {
            await PostReports.create({
                description,
                reportedBy: loggedInUser,
                post: selectedPost,
                status: PENDING,
                collegeInfoId: loggedInUser.collegeInfoId
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

const fetchPostReports = async (req, res) => {
    const loggedInUser = req.user;

    try {
        const postReports = await fetchPostReportsById(loggedInUser.collegeInfoId._id);
        return setSuccessResponse(res, "Post Reports fetched successfully", postReports);
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const fetchPostReportsById = async (collegeId) => {
    return await PostReports.find({
        status: PENDING,
        collegeInfoId: collegeId
    })
        .populate('reportedBy')
        .populate('post')
}

const handleApprovePostReports = async (req, res) => {
    const { postReportsId } = req.body;

    try {
        await PostReports.findByIdAndUpdate(postReportsId, {
            status: APPROVED
        }, { new: true });
        return setSuccessResponse(res, "Post Report approved successfully");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const handleRejectPostReports = async (req, res) => {
    const { postReportsId } = req.body;

    try {
        await PostReports.findByIdAndUpdate(postReportsId, {
            status: REJECTED
        }, { new: true });
        return setSuccessResponse(res, "Post Report rejected successfully");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = { reportPost, fetchPostReports, handleApprovePostReports, handleRejectPostReports };