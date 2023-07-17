import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import fetchData from '../../utils/FetchAPI';
import { API_TO_FETCH_POST_DETAILS, API_TO_LIKE_UNLIKE_POST, API_TO_SAVE_COMMENTS } from '../../utils/APIRequestUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const PostDetailComponent = (props) => {
    const openUserPost = useRef(null);
    const [postDetails, setPostDetails] = useState({});
    const [postComments, setPostComments] = useState([]);
    const { userDetail, isNotificationDetail } = props;
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPostDetails();
        M.Modal.init(openUserPost.current);
        return () => {
            setPostDetails({});
        };
    }, [props]);

    const cancelPostDetailModal = () => {
        const modalInstance = M.Modal.getInstance(openUserPost.current);
        modalInstance.close();
    };

    const fetchPostDetails = async () => {
        const { selectedPostId } = props;
        setPostComments('');
        try {
            const data = await fetchData(API_TO_FETCH_POST_DETAILS, 'POST', { _id: selectedPostId });
            console.log(data, "post");
            setPostDetails(data.body.postDetails[0]);
            setPostComments(prevComments => [...prevComments, ...data.body.postComments]);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const isLiked = async () => {
        const { selectedPostId } = props;
        fetchLikesCount(selectedPostId);
    };

    const fetchLikesCount = async (postId) => {
        try {
            const data = await fetchData(API_TO_LIKE_UNLIKE_POST + `/${postId}`, "PUT");

            console.log(data.body, "likes");
            if (data) {
                const newList = data.body.post;
                let tempPosts = setPostDetails({})
                // setPostDetails({
                //     ...postDetails,

                // })
                // console.log(data.body.postDetails);
                // const updatedPosts = posts.map((post) =>
                //     post._id === postId ? { ...post, likes: newList.likes } : post
                // );
                // setPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error here:', error);
        }
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
                postId: postDetails._id
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
        <div id="openUserPost" className="modal" ref={openUserPost}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <p></p>
                        <FontAwesomeIcon icon={faTimes} className="close" onClick={cancelPostDetailModal} />
                    </div>

                    <div className="modal-body" style={{ overflow: 'auto' }}>
                        <div className="d-flex justify-content-between post-detail-container">
                            <div className="col-md-6 mr-2">
                                <div className="image-wrapper mb-2" style={{ maxHeight: '300px', overflow: 'hidden' }}>
                                    <img src={postDetails?.imageUrl} alt="Selected" className='img-fluid' />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="d-flex mt-2 post-detail-caption">
                                    <div className="creator_block_post">
                                        <img alt="photographer Image" className="creator_image_post" src={userDetail?.profilePicture} />
                                    </div>
                                    <small>
                                        <span className='username'>{postDetails?.postedBy?.username}:</span>
                                        <span className='user-caption ps-2 fw-light'>
                                            {postDetails?.caption}
                                        </span>
                                    </small>
                                </div>
                                <p></p>

                                <div className="d-flex flex-wrap post-details-stats">
                                    <div>
                                        <FontAwesomeIcon icon={faHeart} onClick={isLiked} />
                                        <span className='p-1'>{postDetails?.likes} likes</span>
                                    </div>

                                    <div>
                                        <FontAwesomeIcon icon={faComment} />
                                        <span className='p-2'>{postDetails?.comments} comments</span>
                                    </div>
                                </div>

                                {postComments.length > 0 && (
                                    <div className="comments-container">
                                        {postComments.map(postComment => (
                                            <div key={postComment._id} className="comment">
                                                <img className="creator_image_post" src={postComment.commentedBy.profilePicture} alt="Profile" />
                                                <span className="username">{postComment.commentedBy.username + " "}</span>
                                                <span>{postComment.comment}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!isNotificationDetail && (
                                    <>
                                        <textarea
                                            className='mt-2 post-comment'
                                            placeholder='Enter your comment'
                                            value={comment}
                                            onChange={handleOnChange}
                                            name="comment"
                                        ></textarea>
                                        <p className="required errormsg errpad1">
                                            {error["comment"]}
                                        </p>
                                        <button onClick={saveComment}>Comment</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailComponent;
