import React from "react";

import Header from "../Header.jsx";
import { API_TO_FETCH_PROFILE_DETAILS, API_TO_VIEW_FOLLOWERS } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import UserViewPost from './UserViewPost.jsx';

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
    };
  }

  likedIcon = () => {
    const { isLiked, likes } = this.state;
    this.setState({
      likes: isLiked ? likes - 1 : likes + 1,
      isLiked: !isLiked
    });
  };

  handleImageClick = (src) => {
    console.log('Image clicked:', src);
    this.setState({
      isUserPostOpen: true,
      selectedImage: src,
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
        <div className="">
          <div className="mt-5">
            <div className="d-flex align-items-center border rounded-3 border-2 mt-5" style={{ background: '#f4f49f' }}>
              <div className="creator_block">
                <img alt="photographer Image" className="creator_image" src="../../assets/elevated.jpg" />
              </div>

              <div className="container_button">
                <div className="sync">
                  <div className="creator_desc">{userDetail?.firstName + " " + userDetail?.lastName}</div>
                  <Link>
                    <div className="creator_details first_text">100 Followers</div>
                  </Link>
                  <Link>
                    <div className="creator_details t_layout">
                      {followers.map((follower) => (
                        <li key={follower.id}>
                          <span>{follower.username}</span>
                        </li>
                      ))}1000 Following</div>
                  </Link>
                  <div className="creator_details t_layout">{posts?.length} POSTS</div>
                  <div className="desc">Hey Community! I am a professional photographer and I love to capture the real-life moments. Please follow to not miss my latest uploads.</div>
                </div>
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
                <div className="image_grid mt-5 user_details_container">
                  {posts?.length > 0 && (
                    posts.map((post) => (
                      <Link onClick={() => this.handleImageClick(post.imageUrl)} data-target="openUserPost" >
                        <div className="images" key={post.id}>
                          <img alt="captured images" className="p_img" src={post.imageUrl} />
                          <p>{post.caption}</p>
                          <div className="text">
                            <div>
                              <FontAwesomeIcon icon={faHeart} className='me-3' color={isLiked ? 'red' : 'gray'} onClick={this.likedIcon} />
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
          (<UserViewPost
            selectedImage={this.state.selectedImage}
            selectedCaption={this.state.selectedCaption} />
          )}
      </main>
    );
  }
}
