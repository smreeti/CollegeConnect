import React, { useState, useEffect } from "react";
import Header from "../Header.jsx";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import fetchData from "../../utils/FetchAPI.js";
import PostDetailComponent from "./PostDetailComponent.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faCog, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { API_TO_FETCH_PROFILE_DETAILS, API_TO_VIEW_FOLLOWERS, API_TO_LIKE_UNLIKE_POST, API_TO_FOLLOW, API_TO_FOLLOW_USER, API_TO_UNFOLLOW_USER } from "../../utils/APIRequestUrl.js";
import PostLikesComponent from './PostLikesComponent.jsx';
import { getLoggedInUser } from "../../utils/Auth.js";


const ProfileComponent = () => {
  const [likes, setLikes] = useState(0);
  // const [isLiked, setIsLiked] = useState(false);
  const [isUserPostOpen, setIsUserPostOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
  const [selectedPostDetailId, setSelectedPostDetailId] = useState("");
  const [followers, setFollowers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedInUser = getLoggedInUser();
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
      const hasUserLiked = isLiked(data.body.posts[0].likes);
      setIsPostLiked(hasUserLiked);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const likePost = async (postId) => {
    await fetchLikesCount(postId);
  };

  const isLiked = (likes) => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    let isFound = likes.findIndex(user => user.user === currentUser._id);
    return isFound > -1;
  }

  const OpenModalLikes = (post) => {
    setIsLikesModalOpen(true);
    setSelectedPostId(post.likes)
  }

  const handleImageClick = (post) => {
    setIsUserPostOpen(true);
    setSelectedPostId(post._id);
  };

  const fetchLikesCount = async (postId) => {
    try {
      const data = await fetchData(API_TO_LIKE_UNLIKE_POST + `/${postId}`, "PUT");
      if (data) {
        const newList = data.body;
        let tempPost = [{ ...userProfileDetails }];
        let postIndex = tempPost.findIndex((post) => post._id === postId);
        let activePost = tempPost[postIndex];
        activePost.likes = newList.likes;
        tempPost[postIndex] = activePost
        setUserProfileDetails(tempPost[0]);
        const hasUserLiked = isLiked(tempPost[0].likes);
        setIsPostLiked(hasUserLiked);
      }
    } catch (error) {
      console.error('Error here:', error);
    }
  }

  const handleModalClose = (updatePostData) => {
    let actualPostData = [...posts]
    let postIndex = actualPostData.findIndex(post => post._id === updatePostData._id);
    let activePost = actualPostData[postIndex];
    activePost.likes = updatePostData.likes
    actualPostData[postIndex] = activePost
    setPosts(actualPostData)
  }

  const followUser = async (e) => {
    e.preventDefault();
    const followObj = {
      followingUserId: id
    }
    try {
      await fetchData(API_TO_FOLLOW_USER, "POST", followObj);
      await fetchUserProfileDetails();
    } catch (error) {
      console.log(error);
    }
  }

  const unFollowUser = async (e) => {
    e.preventDefault();
    try {
      await fetchData(API_TO_UNFOLLOW_USER + `/${id}`, "POST");
      await fetchUserProfileDetails();
    } catch (error) {
      console.log(error);
    }
  }

  const { isFollowing } = userProfileDetails;

  return (
    <main>
      <Header />
      <div className="mt-5" style={{ minHeight: "93vh" }}>
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
            <div className="container_button d-flex justify-content-center ">
              <div className="sync">
                <div className="d-flex justify-content-between">
                  <div className="creator_desc text-nowrap">{userDetails?.firstName + " " + userDetails?.lastName}</div>
                  <button className="editbutton">
                    <Link className="edpr" to="/edit">
                      <FontAwesomeIcon icon={faCog} /> Edit Profile
                    </Link>
                  </button>

                  {
                    loggedInUser._id !== id && (
                      <button onClick={isFollowing ? unFollowUser : followUser} className="editbutton">
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )
                  }

                </div>
                <div className="user_details_bio_container mt-4">
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
                  <div className="images bg-dark" >
                    <img alt="captured images" className="p_img" src={post.imageUrl} />
                    <div className="text d-flex">
                      <div>
                        <FontAwesomeIcon icon={faHeart} className='me-3 ' color={isLiked(post.likes) ? "red" : "silver"}
                          onClick={() => likePost(post._id)} />
                        <Link onClick={() => OpenModalLikes(post)}>
                          {post?.likes?.length > 0 ? <small className='fs-6 fw-lighter text-white'><p>{post?.likes?.length}</p></small> : <small className='fs-6 fw-lighter text-white'><p>{post?.likes?.length}</p></small>}
                        </Link>
                      </div>

                      <div>
                        <FontAwesomeIcon icon={faComment} />
                        <small className='fs-6 fw-lighter'><p>{post.comments}</p></small>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {
        isUserPostOpen && (
          <PostDetailComponent
            selectedPostId={selectedPostId}
            userDetail={userDetails}
            onClose={handleModalClose}
            OpenLikesModal={OpenModalLikes}
          />
        )
      }
      {
        isLikesModalOpen && (
          <PostLikesComponent
            selectedPostId={selectedPostId}
          />
        )
      }
    </main >
  );
};

export default ProfileComponent;
