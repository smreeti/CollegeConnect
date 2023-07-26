import React, { useRef, useEffect, useState } from 'react'
import M from 'materialize-css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_TO_FETCH_FOLLOWERS, API_TO_REMOVE_FOLLOWERS } from '../../utils/APIRequestUrl';
import fetchData from '../../utils/FetchAPI';
import { getLoggedInUser } from '../../utils/Auth';
import { Link } from 'react-router-dom';

const FollowerModalComponent = (props) => {
    const userFollowersModal = useRef(null);
    const [followersList, setFollowersList] = useState([]);
    const { id } = props;
    const loggedInUser = getLoggedInUser();

    useEffect(() => {
        M.Modal.init(userFollowersModal.current);
    }, [props]);

    useEffect(() => {
        fetchFollowers();
    }, []);

    const closeModal = () => {
        const modalInstance = M.Modal.getInstance(userFollowersModal.current);
        modalInstance.close();
        window.location.reload();
    };

    const fetchFollowers = async () => {
        try {
            const data = await fetchData(API_TO_FETCH_FOLLOWERS + `/${id}`, "POST");
            setFollowersList(data.body.followers);
        } catch (error) {
            console.log(error);
        }
    }

    const removeFollower = async (followerUserId) => {
        try {
            const data = await fetchData(API_TO_REMOVE_FOLLOWERS + `/${followerUserId}`, "POST");
            setFollowersList(data.body.followers);
            await fetchFollowers();
        } catch (error) {
            console.log(error);
        }
    }

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
                            {followersList?.length > 0 ?
                                (
                                    followersList?.map(followersData => (
                                        <ul className="collection" key={followersData._id}>

                                            <li className='d-flex'>
                                                <div className="creator_block_post">
                                                    {followersData?.userId?.profilePicture === "default" ? (
                                                        <img className="creator_image_post" src="/assets/defaultProfileImage.png" alt="Profile" />
                                                    ) : (
                                                        <img
                                                            className="creator_image_post" src={followersData?.userId?.profilePicture}
                                                            alt="Profile"
                                                        />
                                                    )}
                                                </div>
                                                <div className="user-modal-details ml-2">
                                                    <span className="username">
                                                        <Link to={`/profile/${followersData?.userId?._id}`}>
                                                            {followersData?.userId?.username}
                                                        </Link>
                                                    </span>
                                                    <span className='fullName'>
                                                        {followersData?.userId?.firstName + " " + followersData?.userId?.lastName}</span>

                                                </div>

                                                {id === loggedInUser._id && (
                                                    <div className='follow-modalbtn'>
                                                        <button onClick={() => removeFollower(followersData.userId._id)}
                                                            className='btn btn-primary btn-sm'>Remove</button>
                                                    </div>)
                                                }
                                            </li>
                                        </ul>

                                    ))
                                ) :
                                <div className='text-center'>
                                    <i className='text-secondary text-center'>No Follower Yet</i>
                                </div>
                            }

                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default FollowerModalComponent;
