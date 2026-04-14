import React, { useRef, useEffect, useState } from 'react'
import M from 'materialize-css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_TO_FETCH_FOLLOWING_USERS, API_TO_UNFOLLOW_USER } from '../../utils/APIRequestUrl';
import fetchData from '../../utils/FetchAPI';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/Auth';

const FollowingModalComponent = (props) => {
    const userFollowingModal = useRef(null);
    const [followingUsersList, setFollowingUsersList] = useState([]);
    const { id } = props;
    const loggedInUser = getLoggedInUser();

    useEffect(() => {
        M.Modal.init(userFollowingModal.current);
        fetchFollowingUsers();
    }, [props]);

    const closeModal = () => {
        const modalInstance = M.Modal.getInstance(userFollowingModal.current);
        modalInstance.close();
        window.location.reload();
    };

    const fetchFollowingUsers = async () => {
        try {
            const data = await fetchData(API_TO_FETCH_FOLLOWING_USERS + `/${id}`, "POST");
            setFollowingUsersList(data.body.followingUsers)
        } catch (error) {
            console.log(error);
        }
    }

    const unFollowUser = async (followingUserId) => {
        try {
            await fetchData(API_TO_UNFOLLOW_USER + `/${followingUserId}`, "POST");
            await fetchFollowingUsers();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div id="userFollowingModal" className="modal" ref={userFollowingModal}>
                <div className="modal-likes-dialog mx-auto modal-md mt-5 ">
                    <div className="modal-content mx-auto modaldesc ">
                        <div className="modal-header">
                            <div className="modal-title">
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

                                        <li className="collection-item" key={followingUser._id}>
                                            <div className="d-flex align-items-center">
                                                <div className="creator_block_post">
                                                    {followingUser?.followingUserId?.profilePicture === "default" ? (
                                                        <img
                                                            className="creator_image_post"
                                                            src="/assets/defaultProfileImage.png"
                                                            alt="Profile"
                                                        />
                                                    ) : (
                                                        <img
                                                            className="creator_image_post"
                                                            src={followingUser?.followingUserId?.profilePicture}
                                                            alt="Profile"
                                                        />
                                                    )}
                                                </div>
                                                <div className="user-modal-details ml-2">
                                                    <span className="username">
                                                        <Link to={`/profile/${followingUser?.followingUserId?._id}`}>
                                                            {followingUser?.followingUserId?.username}
                                                        </Link>
                                                    </span>
                                                    <span className='fullName'> {followingUser?.followingUserId?.firstName + " " + followingUser?.followingUserId?.lastName}</span>
                                                </div>
                                            </div>
                                            {id === loggedInUser._id && (
                                                <div className='follow-modalbtn'>
                                                    <button onClick={() => unFollowUser(followingUser.followingUserId._id)}
                                                        className='btn btn-primary btn-sm'>UnFollow</button>
                                                </div>)}
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
