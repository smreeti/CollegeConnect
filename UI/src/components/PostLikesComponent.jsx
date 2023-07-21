import React, { useRef, useEffect, useState } from 'react'
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_FETCH_POST_LIKES } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PostLikesComponent = (props) => {
    const postLikesModal = useRef(null);
    const [likesList, setLikesList] = useState([]);

    useEffect(() => {
        fetchPostLikes();
        M.Modal.init(postLikesModal.current);
    }, [props]);


    const closeModal = () => {
        const modalInstance = M.Modal.getInstance(postLikesModal.current);
        modalInstance.close()
    };

    const fetchPostLikes = async () => {
        const { selectedPostId } = props;
        try {
            const data = await fetchData(API_TO_FETCH_POST_LIKES, "POST", { _id: selectedPostId });
            setLikesList(data.body?.postLikes);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            <div id="postLikesModal" className="modal" ref={postLikesModal}>
                <div className="modal-likes-dialog mx-auto my-auto modal-md ">
                    <div className="modal-content mx-auto my-auto modaldesc ">
                        <div className="modal-header">
                            <div className="modal-title ">
                                <h5 className='text-center'>Liked by</h5>
                            </div>
                            <div className="modal-close">
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="close"
                                    onClick={closeModal}
                                />
                            </div>
                        </div>
                        <div className="modal-body">
                            {likesList.map(likesData => (
                                <ul className="collection" key = {likesData._id}>

                                    <li className='d-flex'>
                                        <div className="creator_block_post">
                                            {likesData?.profilePicture === "default" ? (
                                                <img className="creator_image_post" src="/assets/defaultProfileImage.png" alt="Profile" />
                                            ) : (
                                                <img
                                                    className="creator_image_post" src={likesData?.profilePicture}
                                                    alt="Profile"
                                                />
                                            )}
                                        </div>
                                        <small>
                                            <span className='username'>{likesData?.username}</span>
                                        </small>
                                        <button className='btn btn-primary ms-auto btn-sm'>Follow</button>
                                    </li>
                                </ul>

                            ))}

                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default PostLikesComponent;
