import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import fetchData from "../../utils/FetchAPI";
import {
    API_TO_FETCH_POST_DETAILS, API_TO_LIKE_UNLIKE_POST,
    API_TO_SAVE_COMMENTS,
} from "../../utils/APIRequestUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faHeart,
    faComment,
    faThin,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PostLikesComponent from './PostLikesComponent.jsx';

import { formatDistanceToNow } from 'date-fns';

const PostDetailComponent = (props) => {
    const openUserPost = useRef(null);
    const [postDetails, setPostDetails] = useState({});
    const [postComments, setPostComments] = useState([]);
    const { userDetail, isNotificationDetail, onClose } = props;
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
    const [selectedPostDetailId, setSelectedPostDetailId] = useState("");
    const [modalData, setModalData] = useState('');

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
        onClose(postDetails);
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
            const hasUserLiked = isLiked(data.body.postDetails[0].likes);
            setIsPostLiked(hasUserLiked);
            console.log(hasUserLiked);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const likePost = async (postId) => {
        await fetchLikesCount(postId);
    };

    const isLiked = (likes) => {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        let isFound = likes.findIndex(user => user.user === currentUser._id);
        return isFound > -1;
    }

    const fetchLikesCount = async (postId) => {
        try {
            const data = await fetchData(API_TO_LIKE_UNLIKE_POST + `/${postId}`, "PUT");
            if (data) {
                const newList = data.body.post;
                let tempPost = [{ ...postDetails }];
                let postIndex = tempPost.findIndex((post) => post._id === postId);
                let activePost = tempPost[postIndex];
                activePost.likes = newList.likes;
                tempPost[postIndex] = activePost
                setPostDetails(tempPost[0]);
                const hasUserLiked = isLiked(tempPost[0].likes);
                setIsPostLiked(hasUserLiked);
                console.log(hasUserLiked, "here");
            }
        } catch (error) {
            console.error('Error here:', error);
        }
    }

    const OpenModalLikes = (post) => {
        post = [post];
        cancelPostDetailModal();
        setTimeout(() => {
            setIsLikesModalOpen(true);
            setSelectedPostDetailId(post[0].likes);
        }, 1000);
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
        validatePostComment();
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
                                            {postDetails?.postedBy?.username}:
                                        </span>
                                        <span className="user-caption ps-2 fw-light fonting">
                                            {postDetails?.caption}
                                        </span>
                                    </small>
                                </div>
                                <hr></hr>

                                <div className="comments-container">
                                    {postComments.length > 0 && (
                                        postComments.map((postComment) => (
                                            <div key={postComment._id} className="comment">
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

                                                <span className="username fonting">
                                                    {postComment.commentedBy.username + " "}
                                                </span>
                                                <span className="commentmain fonting">
                                                    {postComment.comment}
                                                </span><br />
                                                <span>
                                                    {formatDistanceToNow(new Date(postComment.createdDate), { addSuffix: true })}
                                                </span>
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
                                                    <span onClick={() => OpenModalLikes(postDetails)} data-target="postLikesModal" className='modal-trigger'>
                                                        <span className="p-1 fonting">{postDetails?.likes?.length} likes</span>
                                                    </span>
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
                </div >
            </div >
            {isLikesModalOpen && (
                <PostLikesComponent
                    selectedPostId={selectedPostDetailId}
                />
            )}
        </div >
    );
};

export default PostDetailComponent;
