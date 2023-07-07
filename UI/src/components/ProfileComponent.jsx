import React from "react";

import Header from "../Header.jsx";
import { API_TO_FETCH_PROFILE_DETAILS, API_TO_VIEW_FOLLOWERS } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import PostDetailComponent from "./PostDetailComponent.jsx";
import defaultProfileImage from "../../public/assets/defaultProfileImage.png";

export default class ProfileComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      userProfileDetails: {},
      likes: 0,
      isLiked: false,
      isUserPostOpen: false,
      followers: [],
      userDetails: [],
      isMenuOpen: false
    };
  }

  likedIcon = () => {
    const { isLiked, likes } = this.state;
    this.setState({
      likes: isLiked ? likes - 1 : likes + 1,
      isLiked: !isLiked
    });
  };

  handleImageClick = (post) => {
    this.setState({
      isUserPostOpen: true,
      selectedPostId: post._id,
    });
  };

  componentDidMount() {
    this.fetchUserProfileDetails();
    // this.fetchFollowers();
  }

  async fetchUserProfileDetails() {
    try {
      const data = await fetchData(API_TO_FETCH_PROFILE_DETAILS, "POST");
      this.setState({
        userProfileDetails: data.body
      })

    } catch (error) {
      console.log("Error:", error);
    }
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !isMenuOpen
    })
  };

  // async fetchFollowers() {
  //   try {
  //     const data = await fetchData(API_TO_VIEW_FOLLOWERS, "POST");
  //     this.setState({
  //       userDetail: data.body
  //     });
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // }

  render() {
    const { userProfileDetails: { posts, userDetail } } = this.state;
    const { isLiked, likes, isUserPostOpen, followers } = this.state;
    const hasProfilePicture = userDetail?.profilePicture;


    return (
      <main>
        <Header />
        <div className="">
          <div className="mt-5">
            <div className="d-flex align-items-center border rounded-3 border-2 mt-5" style={{ background: 'linear-gradient(to right, #f0c27b, #ffe47a)' }}>
              <div className="creator_block">
                {hasProfilePicture ?
                  (<img alt="photographer Image" className="creator_image" src={userDetail?.profilePicture} onError={(e) => { e.target.onerror = null; e.target.src = defaultProfileImage }} />) :
                  (<img alt="No Image" className="creator_image" src={defaultProfileImage} />)
                }
              </div>

              <div className="container_button py-3">
                <div className="sync mb-lg-2 mb-1">
                  <div className="creator_desc">{userDetail?.firstName + " " + userDetail?.lastName} </div>
                  <Link>
                    <div className="creator_details text-dark first_text" >100 Followers</div>
                  </Link>
                  <Link>
                    <div className="creator_details text-dark t_layout" style={{ textDecoration: 'none' }}>
                      {followers.map((follower) => (
                        <li key={follower.id}>
                          <span>{follower.username}</span>
                        </li>
                      ))}1000 Following</div>
                  </Link>

                  <div className="creator_details t_layout">{posts?.length} POSTS</div>
                  <div className="desc">Hey Community! I am a professional photographer and I love to capture the real-life moments. Please follow to not miss my latest uploads.</div>
                </div>
                <Link to="/edit">
                  <input type="button" value="Edit profile" className="edit_profile_button p-2" />
                </Link>
              </div>
            </div>


            {posts?.length == 0 ? (
              <div className="user_details_container d-flex justify-content-center align-items-center profile_no_post" >
                <p className="text-center">
                  "No post(s) yet."
                </p>
              </div>
            ) :
              <>
                <div className="d-flex mt-md-4 mt-3">
                  <hr className="hr w-50" />
                  <small className="px-3 small">POST</small>
                  <hr className="hr w-50" />
                </div>
                <div className="image_grid mt-5 user_details_container">
                  {posts?.length > 0 && (
                    posts.map((post) => (
                      <Link onClick={() => this.handleImageClick(post)} data-target="openUserPost" className="modal-trigger">
                        <div className="images" key={post.id}>
                          <img alt="captured images" className="p_img" src={post.imageUrl} />
                          <div className="text">
                            <div>
                              <FontAwesomeIcon icon={faHeart} className='me-3' color={isLiked ? 'red' : 'gray'}
                                onClick={this.likedIcon} />
                              {likes > 0 ? <small className='fs-6 fw-lighter'><p>{this.state.likes}</p></small> : null}
                            </div>
                            <FontAwesomeIcon icon={faComment} />
                          </div>
                        </div>
                      </Link>
                    )))}
                </div>
              </>
            }
          </div>
        </div>

        {isUserPostOpen &&
          (<PostDetailComponent
            selectedPostId={this.state.selectedPostId}
            userDetail={userDetail}
          />
          )}
      </main>
    );
  }
}
