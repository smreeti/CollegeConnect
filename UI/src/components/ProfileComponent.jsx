import React from "react";

import Header from "../Header.jsx";
import { API_TO_FETCH_PROFILE_DETAILS } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";

export default class HomeComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      userProfileDetails: {}
    }
  }

  componentDidMount() {
    this.fetchUserProfileDetails();
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

  render() {

    const { userProfileDetails: { posts, userDetail } } = this.state;

    return (
      <main>
        <Header />
        <div className="user_details_container">
          <div>
            <div className="image_mainblock">
              <div className="creator_block">
                <img alt="photographer Image" className="creator_image" src="../../assets/elevated.jpg" />
              </div>

              <div className="container_button">
                <div className="sync">
                  <div className="creator_desc">{userDetail?.firstName + " " + userDetail?.lastName}</div>
                  <div className="creator_details first_text">100 Followers</div>
                  <div className="creator_details t_layout">1000 Following</div>
                  <div className="creator_details t_layout">{posts?.length} POSTS</div>
                  <div className="desc">Hey Community! I am a professional photographer and I love to capture the real-life moments. Please follow to not miss my latest uploads.</div>
                </div>
              </div>
            </div>

            <div className="image_grid">
              {posts?.length > 0 ? (
                posts.map((post) => (
                  <div className="images" key={post.id}>
                    <img alt="captured images" className="p_img" src={post.imageUrl} />
                    <span className="number">Likes: {post.likes} </span>
                    <span className="number">Comments: {post.comments}</span>
                  </div>
                ))) : "No post(s) yet."}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
