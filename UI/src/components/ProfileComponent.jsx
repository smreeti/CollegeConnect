import React from "react";

import Header from "../Header.jsx";
import { API_TO_FETCH_PROFILE_DETAILS, API_TO_VIEW_FOLLOWERS } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faCog, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import PostDetailComponent from "./PostDetailComponent.jsx";

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

    return (
      <main>
        <Header />
        <div className="mt-5">
          <div className="headtest">
            <div className="d-flex align-items-center  topcontainer">
              <div className="creator_block">

                {userDetail?.profilePicture === "default" ? (
                  <img className="creator_image" src="/assets/defaultProfileImage.png" alt="Profile" />
                ) : (
                  <img
                    className="creator_image"
                    src={userDetail?.profilePicture}
                    alt="Profile"
                  />
                )}

              </div>

              <div className="container_button">
                <div className="sync">
                  <div className="d-flex align-items-center justify-content-start">
                    <div className="creator_desc">{userDetail?.firstName + " " + userDetail?.lastName}</div>
                    <button className="editbutton">  <Link className="edpr" to="/edit">
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
                    {userDetail?.bio}
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

          {posts?.length == 0 ? (
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
          ) :
            <>

              <div className="profileimage_grid mt-5 user_details_container">
                {posts?.length > 0 && (
                  posts.map((post) => (
                    <Link onClick={() => this.handleImageClick(post)} data-target="openUserPost" className="modal-trigger" key={post._id}>
                      <div className="images" >
                        <img alt="captured images" className="p_img" src={post.imageUrl} />
                        <p>{post.caption}</p>
                        <div className="text">
                          {/* <div>
                            <FontAwesomeIcon icon={faHeart} className='me-3 ' color={isLiked ? 'red' : 'gray'}
                              onClick={this.likedIcon} />
                            {likes > 0 ? <small className='fs-6 fw-lighter'><p>{this.state.likes}</p></small> : null}
                          </div>
                          <FontAwesomeIcon icon={faComment} /> */}
                        </div>
                      </div>
                    </Link>
                  )))}
              </div>
            </>
          }
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
