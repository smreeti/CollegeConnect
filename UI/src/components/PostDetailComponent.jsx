import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import fetchData from '../../utils/FetchAPI';
import { API_TO_FETCH_POST_DETAILS } from '../../utils/APIRequestUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PostDetailComponent = (props) => {
    const openUserPost = useRef(null);
    const [postDetails, setPostDetails] = useState({});

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
        <div id="openUserPost" className="modal p-5" ref={openUserPost}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <FontAwesomeIcon icon={faTimes} className="close" onClick={cancelPostDetailModal} />
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-between">
                            <div className="col-9">
                                <img src={postDetails?.imageUrl} alt="Selected" style={{ width: '300px', height: '350px' }} />
                            </div>
                            <div className="col-3">
                                <div className="px-2">
                                    <p>
                                        {postDetails?.postedBy?.username} <br />
                                        <small>{postDetails?.caption}</small>
                                    </p>
                                    <p>{postDetails?.likes}</p>
                                    <p>{postDetails?.comments}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailComponent;
