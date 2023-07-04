import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_SEARCH_USERS } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchUserComponent = () => {

    const searchModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])

    const searchUsers = async (username) => {
        if (!username) {
            setSearch('')
            setUserDetails([]); // Clear the user details if the username is empty
            return;
        }

        setSearch(username);
        try {
            const data = await fetchData(API_TO_SEARCH_USERS, "POST", { username });
            setUserDetails(data.body);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const closeSearchModal = () => {
        M.Modal.getInstance(searchModal.current).close();
        setSearch('');
    }

    return (
        <>
            <div id="modal1" className="modal modcen" ref={searchModal}>
                <div className="modal-content">
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
                            userDetails.map(userDetail => {
                                return <Link key={userDetail._id} onClick={() => closeSearchModal}>
                                    <li className="collection-item" key={userDetail._id}>
                                        <img className="profilePic"
                                            src={userDetail.profilePicture == "default" ? "assets/profile.png" : userDetail.profilePicture} />
                                        {userDetail.username}
                                    </li>
                                </Link>
                            })
                        ) : (search ? "No user(s) found" : "")}
                    </ul>

                    <div className='suguser'><span id='usermar'>Suggested Colleges</span>
          <li className="collection-item">
            <img
              className="suggestionprofilePic"
              src="../../assets/waterloologo.png"
            />
           <span className='uniname'>UOW</span> 
            <button className="followButton">Follow</button>
          </li>
          <li className="collection-item">
            <img
              className="suggestionprofilePic"
              src="../../assets/laurie.png"
            />
        <span className='uniname'> WLU </span>
            <button className="followButton">Follow</button>
          </li>
          <li className="collection-item">
            <img
              className="suggestionprofilePic"
              src="../../assets/windsor.jpeg"
            />
       <span className='uniname'>  UOW </span>
            <button className="followButton">Follow</button>
          </li>
          <li className="collection-item">
            <img
              className="suggestionprofilePic"
              src="../../assets/toronto.jpeg"
            />
      <span className='uniname'>UOT </span> 
            <button className="followButton">Follow</button>
          </li>
          </div>
                </div>
            </div>
        </>
    )
}

export default SearchUserComponent;