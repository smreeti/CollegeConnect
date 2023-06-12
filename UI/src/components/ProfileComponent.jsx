import React from "react";

import Header from "../Header.jsx";

function ProfileComponent() {
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
              <button>
                <span className="b_text">MOST LIKED</span>
              </button>
              <button>
                <span className="b_text">+ FOLLOW</span>
              </button>

              <div className="sync">
                <div className="creator_desc">John Doe</div>
                <div className="creator_details first_text">100 FOLLOWERS</div>
                <div className="creator_details t_layout">1000 LIKES</div>
                <div className="creator_details t_layout">10 POSTS</div>
                <div className="desc">Hey Community! I am a professional photographer and I love to capture the real-life moments. Please follow to not miss my latest uploads.</div>
              </div>
            </div>
          </div>

          <div className="image_grid">
            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/students.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/potrait.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/young.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>
          </div>

          <div className="image_grid">
            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgone.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgtwo.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgthree.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>
          </div>

          <div className="image_grid">
            <div className="images">
              <img alt="captured images" className="p_img" src="images/../../assets/userimgfour.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgfive.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgsix.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>
          </div>

          <div className="image_grid">
            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgseven.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgeight.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>

            <div className="images">
              <img alt="captured images" className="p_img" src="../../assets/userimgnine.jpg" />
              <img alt="like button" className="icon" src="../../assets/like.png" />
              <span className="number">45</span>
            </div>
          </div>
        </div>
        {/* <div className="see_more">
          <a href="#">See More >> </a>
        </div> */}
      </div>
    </main>
  );
}

export default ProfileComponent;
