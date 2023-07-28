const CommentReports = require("../models/CommentReports");
const PostComments = require("../models/PostComments");
const { PENDING } = require("../utils/ReportStatus");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response");
const { saveUserNotification } = require("./userNotificationController");

const reportComment = async (req, res) => {
    console.log("here");

    const { selectedPostCommentId, description } = req.body;
    console.log(req.body);

    const loggedInUser = req.user;

    try {
        const errors = await validateReportRequest(selectedPostCommentId, description);
        if (errors.length > 0)
            return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

        const selectedPostComment = await PostComments.findById(selectedPostCommentId);

        console.log(selectedPostComment);
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

const fetchCommentReports = async (req, res) => {
    const loggedInUser = req.user;

    try {
        const postReports = await fetchCommentReportsById(loggedInUser.collegeInfoId._id);
        return setSuccessResponse(res, "Comment Reports fetched successfully", postReports);
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const fetchCommentReportsById = async (collegeId) => {
    return await CommentReports.find({
        status: PENDING,
        collegeInfoId: collegeId
    })
        .populate('reportedBy')
        .populate('postComment')
}

const handleApproveCommentReports = async (req, res) => {
    const { commentReportsId, remarks } = req.body;

    try {
        const commentReports = await CommentReports.findByIdAndUpdate(commentReportsId, {
            status: APPROVED,
            remarks
        }, { new: true }).populate('postComment');

        await updatePostComment(commentReports, remarks);

        return setSuccessResponse(res, "Comment Report approved successfully");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const updatePostComment = async (commentReports, remarks) => {

    const { description, postComment } = commentReports;
    await updatePostCommentStatus(postComment._id, BLOCKED, description);

    const userNotificationObj = {
        remarks,
        subject: "Post Removed",
        post: post,
        user: postComment.post.postedBy,
        postComment
    }

    await saveUserNotification(userNotificationObj);
}

const updatePostCommentStatus = async (postCommentId, status, remarks) => {
    await PostComments.findByIdAndUpdate(
        postCommentId,
        {
            status,
            remarks,
        },
        { new: true }
    );
};


const handleRejectCommentReports = async (req, res) => {
    const { commentReportsId, remarks } = req.body;

    try {
        const commentReports = await CommentReports.findByIdAndUpdate(commentReportsId, {
            status: REJECTED,
            remarks
        }, { new: true });

        const userNotificationObj = {
            remarks,
            subject: "Comment Report Rejected",
            post: commentReports.postComment.post,
            user: commentReports.reportedBy,
            postComment: commentReports.postComment
        }

        await saveUserNotification(userNotificationObj);

        return setSuccessResponse(res, "Post Report rejected successfully");
    } catch (error) {
        return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}


module.exports = { reportComment, fetchCommentReports, handleApproveCommentReports, handleRejectCommentReports }