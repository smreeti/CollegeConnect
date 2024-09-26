import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_SEARCH_USERS } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchUserComponent = () => {
    const searchModal = useRef(null);
    const [search, setSearch] = useState('');
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        M.Modal.init(searchModal.current);
    }, []);

    const searchUsers = async (username) => {
        if (!username) {
            setSearch('');
            setUserDetails([]);
            return;
        }

        setSearch(username);
        try {
            const data = await fetchData(API_TO_SEARCH_USERS, "POST", { username });
            setUserDetails(data.body);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const closeSearchModal = () => {
        M.Modal.getInstance(searchModal.current).close();
        setSearch('');
    };

    return (
        <>
            <div id="modal1" className="modal" ref={searchModal}>
                <div className="modal-content searchmod">
                    <div className="modal-close">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close"
                            onClick={closeSearchModal}
                        />
                    </div>

                    <div className="form-group mt-4">
                        <input
                            type="text"
                            className="small rounded p-md-2 p-1 border"
                            placeholder="Search users"
                            value={search}
                            onChange={(e) => searchUsers(e.target.value)}
                        />
                    </div>

                    <ul className="collection">
                        {userDetails?.length > 0 && search ? (
                            userDetails.map((userDetail) => {
                                return (
                                    (userDetail.collegeInfoId &&
                                        <li className="collection-item" key={userDetail._id}>

                                            <div className="creator_block_post">
                                                <img
                                                    className="creator_image_post"
                                                    src={
                                                        userDetail.profilePicture === "default"
                                                            ? "assets/profile.png"
                                                            : userDetail.profilePicture
                                                    }
                                                    alt="Profile"
                                                />
                                            </div>

                                            <div className="user-modal-details ml-2">
                                                <span className="username">
                                                    <Link
                                                        key={userDetail._id}
                                                        to={`/profile/${userDetail._id}`}
                                                        onClick={closeSearchModal}
                                                    >
                                                        {userDetail.username}
                                                    </Link>

                                                </span>
                                                <p className='fullName'>
                                                    {userDetail?.firstName + " " + userDetail?.lastName}</p>
                                            </div>

                                        </li>
                                    )
                                );
                            })
                        ) : search ? (
                            <li className="collection-item">No user(s) found</li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchUserComponent;
