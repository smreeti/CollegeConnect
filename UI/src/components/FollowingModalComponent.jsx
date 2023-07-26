import React, { useRef, useEffect, useState } from 'react'
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_FETCH_FOLLOWERS } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FollowingModalComponent = (props) => {
    const userFollowersModal = useRef(null);
    const [followersList, setFollowersList] = useState([]);
    const { followers } = props;

    useEffect(() => {
        M.Modal.init(userFollowersModal.current);
    }, [props]);

    useEffect(() => {
        fetchFollowers();
    }, []);

    const closeModal = () => {
        const modalInstance = M.Modal.getInstance(userFollowersModal.current);
        modalInstance.close()
    };

    const fetchFollowers = () => {
        setFollowersList(followers);
    };

    return (
        <>
            <div id="userFollowersModal" className="modal" ref={userFollowersModal}>
                <div className="modal-likes-dialog mx-auto modal-md mt-5 ">
                    <div className="modal-content mx-auto modaldesc ">
                        <div className="modal-header">
                            <div className="modal-title ">
                                <h5 className='text-center'>Followers</h5>
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
                            {followersList.map(followersData => (
                                <ul className="collection" key={followersData._id}>

                                    <li className='d-flex'>
                                        <div className="creator_block_post">
                                            {followersData?.userId?.profilePicture === "default" ? (
                                                <img className="creator_image_post" src="/assets/defaultProfileImage.png" alt="Profile" />
                                            ) : (
                                                <img
                                                    className="creator_image_post" src={followersData?.profilePicture}
                                                    alt="Profile"
                                                />
                                            )}
                                        </div>
                                        <small>
                                            <span className='username'>{followersData?.userId?.username}</span>
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

export default FollowingModalComponent;
