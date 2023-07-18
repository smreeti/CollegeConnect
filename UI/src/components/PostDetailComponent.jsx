import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import fetchData from "../../utils/FetchAPI";
import {
  API_TO_FETCH_POST_DETAILS,
  API_TO_SAVE_COMMENTS,
} from "../../utils/APIRequestUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHeart,
  faComment,
  faThin,
} from "@fortawesome/free-solid-svg-icons";

const PostDetailComponent = (props) => {
  const openUserPost = useRef(null);
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const { userDetail, isNotificationDetail } = props;
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPostDetails();
    M.Modal.init(openUserPost.current);
    return () => {
      setComment("");
      setPostDetails({});
    };
  }, [props]);

  const cancelPostDetailModal = () => {
    const modalInstance = M.Modal.getInstance(openUserPost.current);
    modalInstance.close();
  };

  const fetchPostDetails = async () => {
    const { selectedPostId } = props;
    setPostComments("");

    try {
      const data = await fetchData(API_TO_FETCH_POST_DETAILS, "POST", {
        _id: selectedPostId,
      });

      setPostDetails(data.body.postDetails[0]);

      console.log("cdcsd", data);
      setPostComments((prevComments) => [
        ...prevComments,
        ...data.body.postComments,
      ]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  const validatePostComment = () => {
    let formErrors = {};

    if (!comment) {
      formErrors["comment"] = "Please provide comment";
      setError(formErrors);
    }
  };

  const saveComment = async () => {
    validatePostComment();
    if (Object.keys(error).length <= 0) {
      const commentObj = {
        comment,
        postId: postDetails._id,
      };

      try {
        await fetchData(API_TO_SAVE_COMMENTS, "POST", commentObj);
        setComment("");
        setPostComments("");
        fetchPostDetails();
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <div id="openUserPost" className="modal modalmobilecen" ref={openUserPost}>
      <div className="modal-dialog modal-lg modalwidth">
        <div className="modal-content modalwidth modaldesc ">
          <div className="modal-header">
            <p></p>
            <FontAwesomeIcon
              icon={faTimes}
              className="close"
              onClick={cancelPostDetailModal}
            />
          </div>

          <div className="modal-body modalbodypad" style={{ overflow: "auto" }}>
            <div className="d-flex justify-content-between post-detail-container ipadset">
              <div className="col-md-6 mr-2 imgbox">
                <div
                  className="image-wrapper imgdivbig"
                  style={{ maxHeight: "300px", overflow: "hidden" }}
                >
                  <img
                    src={postDetails?.imageUrl}
                    alt="Selected"
                    className="img-fluid imgmodal"
                  />
                </div>
              </div>
              <div className="col-md-5 datamodal">
                <div className="d-flex mt-2 post-detail-caption">
                  
                  <div className="creator_block_post">
                    <img
                      alt="photographer Image"
                      className="creator_image_post"
                      src={userDetail?.profilePicture}
                    />
                  </div>
                  <small>
                    <span className="username fonting">
                      {postDetails?.postedBy?.username}:
                    </span>
                    <span className="user-caption ps-2 fw-light fonting">
                      {postDetails?.caption}
                    </span>
                  </small>
                </div>
                <hr></hr>
                <p></p>

                {postComments.length > 0 && (
                  <div className="comments-container">
                    {postComments.map((postComment) => (
                      <div key={postComment._id} className="comment">
                        {postComment.commentedBy.profilePicture ===
                        "default" ? (
                          <img
                            className="creator_image_post"
                            src="/assets/profile.png"
                            alt="Profile"
                          />
                        ) : (
                          <img
                            className="creator_image_post"
                            src={postComment.commentedBy.profilePicture}
                            alt="Profile"
                          />
                        )}

                        <span className="username fonting">
                          {postComment.commentedBy.username + " "}
                        </span>
                        <span className="commentmain fonting">
                          {postComment.comment}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

<div className="container-wrapper">

                <div className="divcontainer">
                  <div className="d-flex flex-wrap post-details-stats likecontainer hrmargin">
                    <div className="likecomment">
                      <div>
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={() => {
                            console.log("like");
                          }}
                        />
                        <span className="p-1 fonting">{postDetails?.likes} likes</span>
                      </div>

                      <div>
                        <FontAwesomeIcon icon={faComment} />
                        <span className="p-2 fonting">
                          {postDetails?.comments} comments
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="hrpad"></hr>
                  {!isNotificationDetail && (
                    <>
                      <textarea
                        className="mt-2 post-comment commentbox"
                        placeholder="Enter your comment"
                        value={comment}
                        onChange={handleOnChange}
                        name="comment"
                      ></textarea>
                      <p className="required errormsg errpad1">
                        {error["comment"]}
                      </p>
                      <button className="btncomment" onClick={saveComment}>
                        Post
                      </button>
                    </>
                  )}
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailComponent;
