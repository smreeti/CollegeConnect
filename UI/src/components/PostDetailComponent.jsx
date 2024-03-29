import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import fetchData from "../../utils/FetchAPI";
import {
    API_TO_DELETE_COMMENT,
    API_TO_DELETE_POST,
    API_TO_FETCH_POST_DETAILS,
    API_TO_LIKE_UNLIKE_POST,
    API_TO_SAVE_COMMENTS,
} from "../../utils/APIRequestUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faHeart,
    faComment,
    faEllipsisH,
    faFlag,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import PostLikesComponent from './PostLikesComponent.jsx';

import { formatDistanceToNow } from 'date-fns';
import { getLoggedInUser } from "../../utils/Auth";

import { Dropdown } from "react-bootstrap";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import ReportCommentModal from './ReportCommentModal.jsx';

const PostDetailComponent = (props) => {
    const openUserPost = useRef(null);

    const [postDetails, setPostDetails] = useState({});
    const [postComments, setPostComments] = useState([]);
    const { userDetail, isNotificationDetail, OpenLikesModal } = props;
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);

    const [isPostDropdownVisible, setPostDropdownVisible] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const loggedInUser = getLoggedInUser();
    const [commentId, setCommentId] = useState("")

    useEffect(() => {
        fetchPostDetails();
        M.Modal.init(openUserPost.current);
        return () => {
            setComment("");
            setPostDetails({});
        };
    }, [props]);


    const cancelPostDetailModal = () => {
        const modalInstance = M.Modal.getInstance(openUserPost.current);
        modalInstance.close();
        // onClose(postDetails);
    };

    const fetchPostDetails = async () => {
        const { selectedPostId } = props;
        setPostComments("");
        try {
            const data = await fetchData(API_TO_FETCH_POST_DETAILS, "POST", {
                _id: selectedPostId,
            });

            setPostDetails(data.body.postDetails[0]);
            setPostComments((prevComments) => [
                ...prevComments,
                ...data.body.postComments,
            ]);
            const hasUserLiked = isLiked(data.body.postDetails[0]?.likes);
            setIsPostLiked(hasUserLiked);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const likePost = async (postId) => {
        await fetchLikesCount(postId);
    };

    const isLiked = (likes) => {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        let isFound = likes?.findIndex(user => user.user === currentUser._id);
        return isFound > -1;
    }

    const fetchLikesCount = async (postId) => {
        try {
            const data = await fetchData(API_TO_LIKE_UNLIKE_POST + `/${postId}`, "PUT");
            if (data && data.body && data.body.post) {
                const newList = data.body.post;
                let tempPost = [{ ...postDetails }];
                let postIndex = tempPost.findIndex((post) => post._id === postId);
                let activePost = tempPost[postIndex];
                activePost.likes = newList.likes;
                tempPost[postIndex] = activePost
                setPostDetails(tempPost[0]);
                const hasUserLiked = isLiked(tempPost[0]?.likes);
                setIsPostLiked(hasUserLiked);
            }
        } catch (error) {
            console.error('Error here:', error);
        }
    }

    const OpenModalLikes = (post) => {
        cancelPostDetailModal();
        if (cancelPostDetailModal) {
            console.log("Closed");
        }
        OpenLikesModal(post);
    }

    const handleOnChange = (event) => {
        const { value } = event.target;
        setComment(value);
    };

    const validatePostComment = () => {
        let formErrors = {};

        if (!comment) {
            formErrors["comment"] = "Please provide comment";
            setError(formErrors);
        }
    };

    const saveComment = async () => {
        await validatePostComment();
        if (Object.keys(error).length <= 0) {
            const commentObj = {
                comment,
                postId: postDetails._id,
            };

            try {
                await fetchData(API_TO_SAVE_COMMENTS, 'POST', commentObj);
                setComment('');
                setPostComments('');
                fetchPostDetails();
            } catch (error) {
                console.log('Error', error);
            }
        }
    };

    const togglePostDropdown = () => {
        setPostDropdownVisible((prevState) => !prevState);
    }

    const deleteComment = async (postId, postCommentId) => {
        const deleteCommentObj = {
            postId, postCommentId
        };
        await fetchData(API_TO_DELETE_COMMENT, "POST", deleteCommentObj);
        fetchPostDetails();
    }

    const deletePost = async (postId) => {
        await fetchData(API_TO_DELETE_POST + `/${postId}`, "POST");
        cancelPostDetailModal();
        window.location.reload();
    }

    const openReportModal = async (postId) => {
        setIsReportModalOpen(true)
        setCommentId(postId)
    }

    return (
        <div id="openUserPost" className="modal modalmobilecen" ref={openUserPost}>
            <div className="modal-dialog modal-lg modalwidth">
                <div className="modal-content modalwidth modaldesc ">
                    <div className="modal-header">
                        <p></p>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close"
                            onClick={cancelPostDetailModal}
                        />
                    </div>

                    <div className="modal-body modalbodypad" style={{ overflow: "auto" }}>
                        <div className="d-flex justify-content-between post-detail-container ipadset">
                            <div className="col-md-6 mr-2 imgbox">
                                <div
                                    className="image-wrapper imgdivbig"
                                    style={{ maxHeight: "300px", overflow: "hidden" }}
                                >
                                    <img
                                        src={postDetails?.imageUrl}
                                        alt="Selected"
                                        className="img-fluid imgmodal"
                                    />
                                </div>
                            </div>
                            <div className="col-md-5 datamodal">
                                <div className="d-flex mt-2 post-detail-caption">

                                    <div className="creator_block_post">
                                        {userDetail?.profilePicture ===
                                            "default" ? (
                                            <img
                                                className="creator_image_post"
                                                src="/assets/profile.png"
                                                alt="profile Image"
                                            />
                                        ) : (
                                            <img
                                                className="creator_image_post"
                                                src={userDetail?.profilePicture}
                                                alt="Profile Image"
                                            />
                                        )}
                                    </div>
                                    <small>
                                        <span className="username fonting">
                                            {postDetails?.postedBy?.username}
                                        </span>
                                        <span className="user-caption ps-2 fw-light fonting">
                                            {postDetails?.caption}
                                        </span>
                                    </small>


                                    {!isNotificationDetail && postDetails?.postedBy?._id === loggedInUser._id && (
                                        <Dropdown className="threedots link">
                                            <Dropdown.Toggle
                                                as={FontAwesomeIcon}
                                                icon={faEllipsisH}
                                                className=""
                                                onClick={togglePostDropdown}
                                            />

                                            <Dropdown.Menu show={isPostDropdownVisible}  >
                                                <Dropdown.Item>
                                                    <span
                                                        className="deletecomment"
                                                        onClick={() => deletePost(postDetails._id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        Delete
                                                    </span>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}
                                </div>

                                <hr></hr>
                                <div className="comments-container">
                                    {postComments.length > 0 && (
                                        postComments.map((postComment) => (
                                            <div key={postComment._id} className="comment">
                                                <div className="comment_contents">

                                                    {postComment.commentedBy.profilePicture ===
                                                        "default" ? (
                                                        <img
                                                            className="creator_image_post"
                                                            src="/assets/profile.png"
                                                            alt="Profile"
                                                        />
                                                    ) : (
                                                        <img
                                                            className="creator_image_post"
                                                            src={postComment.commentedBy.profilePicture}
                                                            alt="Profile"
                                                        />
                                                    )}

                                                    <p className="comment_content">
                                                        <span className="username fonting">{postComment.commentedBy.username + " "}</span>
                                                        <span className="commentmain fonting">
                                                            {postComment.comment}
                                                        </span>
                                                    </p>

                                                    <span className="comment-actions">
                                                        {!isNotificationDetail ? (
                                                            <>
                                                                {(loggedInUser._id === postComment.commentedBy._id || postDetails.postedBy._id === loggedInUser._id) && (
                                                                    <FontAwesomeIcon
                                                                        className=""
                                                                        icon={faTrash}
                                                                        onClick={() => deleteComment(postDetails._id, postComment._id)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                )}

                                                                <FontAwesomeIcon
                                                                    data-target="reportCommentModal"
                                                                    className='modal-trigger icons'
                                                                    icon={faFlag}
                                                                    onClick={() => openReportModal(postComment?._id)}
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="timestamp">
                                                    <FontAwesomeIcon className="clock" icon={faClock} /> <span className="clock"> {' '}
                                                        {formatDistanceToNow(new Date(postComment.createdDate), { addSuffix: true })}
                                                    </span>
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="container-wrapper">
                                    <div className="divcontainer">
                                        <div className="d-flex flex-wrap post-details-stats likecontainer hrmargin">
                                            <div className="likecomment">
                                                <div>
                                                    <span onClick={() => { likePost(postDetails._id) }}>
                                                        <FontAwesomeIcon
                                                            icon={faHeart}
                                                            color={isPostLiked ? "red" : "silver"}
                                                        />
                                                    </span>

                                                    {postDetails?.likes?.length == 0 ?
                                                        <small className='fs-6 fw-lighter'> {postDetails?.likes?.length} like</small>
                                                        : <span onClick={() => OpenModalLikes(postDetails)} data-target="postLikesModal" className='modal-trigger text-primary'>
                                                            <small className='fs-6 fw-lighter link'> {postDetails?.likes?.length} {postDetails?.likes?.length == 1 ? 'like' : 'likes'}</small>
                                                        </span>}
                                                </div>

                                                <div>
                                                    <FontAwesomeIcon icon={faComment} />
                                                    <span className="p-2 fonting">
                                                        {postDetails?.comments} comments
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="hrpad"></hr>
                                        {!isNotificationDetail && (
                                            <>
                                                <textarea
                                                    className="mt-2 post-comment commentbox"
                                                    placeholder="Enter your comment"
                                                    value={comment}
                                                    onChange={handleOnChange}
                                                    name="comment"
                                                ></textarea>
                                                <p className="required errormsg errpad1">
                                                    {error["comment"]}
                                                </p>
                                                <button className="btncomment" onClick={saveComment}>
                                                    Post
                                                </button>
                                            </>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLikesModalOpen && (
                <PostLikesComponent closePostDetailModal={cancelPostDetailModal()} />
            )}

            {isReportModalOpen &&
                <ReportCommentModal
                    selectedCommenttId={commentId}
                />}


        </div>
    );
};

export default PostDetailComponent;
