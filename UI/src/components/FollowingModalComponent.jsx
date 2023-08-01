import React, { useRef, useEffect, useState } from 'react'
import M from 'materialize-css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FollowingModalComponent = (props) => {
    const userFollowingModal = useRef(null);
    const [followingUsersList, setFollowingUsersList] = useState([]);
    const { followship, isUserProfile } = props;

    console.log(followship, "btn");
    useEffect(() => {
        M.Modal.init(userFollowingModal.current);
    }, []);

    useEffect(() => {
        fetchFollowingUsers();
    }, [followship]);

    const closeModal = () => {
        const modalInstance = M.Modal.getInstance(userFollowingModal.current);
        modalInstance.close()
    };

    const fetchFollowingUsers = () => {
        setFollowingUsersList(followship);
    };

    return (
        <>
            <div id="userFollowingModal" className="modal" ref={userFollowingModal}>
                <div className="modal-likes-dialog mx-auto modal-md mt-5 ">
                    <div className="modal-content mx-auto modaldesc ">
                        <div className="modal-header">
                            <div className="modal-title ">
                                <h5 className='text-center'>Following</h5>
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
                            {followingUsersList?.length > 0 ?
                                (followingUsersList.map(followingUser => (
                                    <ul className="collection" key={followingUser._id}>

                                        <li className='d-flex'>
                                            <div className="creator_block_post">
                                                {followingUser?.followingUserId?.profilePicture === "default" ? (
                                                    <img className="creator_image_post" src="/assets/defaultProfileImage.png" alt="Profile" />
                                                ) : (
                                                    <img
                                                        className="creator_image_post" src={followingUser?.followingUserId?.profilePicture}
                                                        alt="Profile"
                                                    />
                                                )}
                                            </div>
                                            <small>
                                                <span className='username'>{followingUser?.followingUserId?.username}</span>
                                            </small>
                                            {!isUserProfile ? <button className='btn btn-primary ms-auto btn-sm'>Follow</button> : null
                                            }
                                        </li>
                                    </ul>

                                ))) :
                                <div className='text-center'>
                                    <i className='text-secondary text-center'>Following List is Empty</i>
                                </div>
                            }
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default FollowingModalComponent;
