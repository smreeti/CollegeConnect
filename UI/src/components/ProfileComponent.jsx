import React, { useState, useEffect } from "react";
import Header from "../Header.jsx";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import fetchData from "../../utils/FetchAPI.js";
import PostDetailComponent from "./PostDetailComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faCog, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { API_TO_FETCH_PROFILE_DETAILS, API_TO_VIEW_FOLLOWERS } from "../../utils/APIRequestUrl.js";

const ProfileComponent = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isUserPostOpen, setIsUserPostOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [posts, setPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchUserProfileDetails();
  }, [id]);

  useEffect(() => {
    setUserDetails(userProfileDetails.userDetail);
    setPosts(userProfileDetails.posts);
  }, [userProfileDetails]);

  const fetchUserProfileDetails = async () => {
    try {
      const data = await fetchData(API_TO_FETCH_PROFILE_DETAILS, "POST", { id });
      setUserProfileDetails(data.body);
      setUserDetails(userProfileDetails.userDetail);
      setPosts(userProfileDetails.posts);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const likedIcon = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleImageClick = (post) => {
    setIsUserPostOpen(true);
    setSelectedPostId(post._id);
  };

  return (
    <main>
      <Header />
      <div className="mt-5">
        <div className="headtest">
          <div className="d-flex align-items-center  topcontainer">
            <div className="creator_block">
              {userDetails?.profilePicture === "default" ? (
                <img className="creator_image" src="/assets/defaultProfileImage.png" alt="Profile" />
              ) : (
                <img
                  className="creator_image"
                  src={userDetails?.profilePicture}
                  alt="Profile"
                />
              )}
            </div>
            <div className="container_button">
              <div className="sync">
                <div className="d-flex align-items-center justify-content-start">
                  <div className="creator_desc">{userDetails?.firstName + " " + userDetails?.lastName}</div>
                  <button className="editbutton">
                    <Link className="edpr" to="/edit">
                      <FontAwesomeIcon icon={faCog} /> Edit Profile
                    </Link>
                  </button>
                </div>
                <div className="user_details_bio_container">
                  <div>
                    <span className="bolding">100</span> Followers
                  </div>
                  <div>
                    <span className="bolding">1000</span> Following
                  </div>
                  <div>
                    <span className="bolding">{posts?.length}</span> POSTS
                  </div>
                </div>
                <div className="desc">
                  {userDetails?.bio}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mt-md-4 mt-3">
          <hr className="hr w-50" />
          <small className="px-3 small">POSTS</small>
          <hr className="hr w-50" />
        </div>
        {posts?.length === 0 ? (
          <div className="main-container" style={{ background: '#F5F5DC' }}>
            <div className="col-lg-6 col-12 p-3 px-md-5 py-md-4 card">
              <div className="text-center">
                <p className='mt-md-5 mt-2'>
                  <FontAwesomeIcon icon={faFileImage} size='3x' color='#008080' />
                </p>
                <h2 className="fs-2" style={{ color: '#008080' }}>
                  Sorry No Post Yet!
                </h2>
                <div className="mt-md-2 mt-2" >
                  <small>Create Posts to view them in your profile</small>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profileimage_grid mt-5 user_details_container">
            {posts?.length > 0 && (
              posts.map((post) => (
                <Link onClick={() => handleImageClick(post)}
                  data-target="openUserPost"
                  className="modal-trigger" key={post._id}
                >
                  <div className="images" >
                    <img alt="captured images" className="p_img" src={post.imageUrl} />
                    <p>{post.caption}</p>
                    <div className="text">
                      {/* <div>
                        <FontAwesomeIcon icon={faHeart} className='me-3 ' color={isLiked ? 'red' : 'gray'}
                          onClick={likedIcon} />
                        {likes > 0 ? <small className='fs-6 fw-lighter'><p>{likes}</p></small> : null}
                      </div>
                      <FontAwesomeIcon icon={faComment} /> */}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {isUserPostOpen && (
        <PostDetailComponent
          selectedPostId={selectedPostId}
          userDetail={userDetails}
        />
      )}
    </main>
  );
};

export default ProfileComponent;
