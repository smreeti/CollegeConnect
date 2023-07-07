import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import fetchData from '../../utils/FetchAPI';
import { API_TO_FETCH_POST_DETAILS, API_TO_FETCH_PROFILE_DETAILS } from '../../utils/APIRequestUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const PostDetailComponent = (props) => {
    const openUserPost = useRef(null);
    const [postDetails, setPostDetails] = useState({});
    const { userDetail } = props;

    useEffect(() => {
        fetchPostDetails();
        M.Modal.init(openUserPost.current);
    }, []);


    const cancelPostDetailModal = () => {
        const modalInstance = M.Modal.getInstance(openUserPost.current);
        modalInstance.close();
    };

    const fetchPostDetails = async () => {
        const { selectedPostId } = props;

        try {
            const data = await fetchData(API_TO_FETCH_POST_DETAILS, 'POST', { _id: selectedPostId });

            setPostDetails(data.body.postDetails[0]);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div id="openUserPost" className="modal" ref={openUserPost}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <FontAwesomeIcon icon={faTimes} className="close" onClick={cancelPostDetailModal} />
                    </div>
                    <div className="modal-body" style={{ overflow: 'auto' }}>
                        <div className="d-flex justify-content-between">
                            <div className="col-md-7">
                                <div className="image-wrapper" style={{ height: '300px', overflow: 'hidden' }}>
                                    <img src={postDetails?.imageUrl} alt="Selected" className='img-fluid' />
                                </div>
                            </div>
                            <div className="col-md-5 ps-1">
                                <div className="d-flex">
                                    <div className="creator_block_post">
                                        <img alt="photographer Image" className="creator_image_post" src={userDetail?.profilePicture} />
                                    </div>
                                    <small className='d-flex'>
                                        {postDetails?.postedBy?.username}
                                    </small>
                                </div><br />
                                <div className="d-flex">
                                    <div className="creator_block_post">
                                        <img alt="photographer Image" className="creator_image_post" src={userDetail?.profilePicture} />
                                    </div>
                                    <small className='d-flex'>
                                        {postDetails?.postedBy?.username}:
                                        <p className='user-caption '>
                                            {postDetails?.caption}
                                        </p>
                                    </small>
                                </div>
                                <p></p>
                                <div className="d-flex flex-wrap">
                                    <FontAwesomeIcon icon={faHeart} className='me-3' />
                                    <FontAwesomeIcon icon={faComment} />
                                </div>
                                {postDetails?.likes > 0 && <p>Liked by {postDetails?.likes} people </p>}
                                {postDetails?.comments > 0 && <p>Liked by {postDetails?.comments} people </p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailComponent;
