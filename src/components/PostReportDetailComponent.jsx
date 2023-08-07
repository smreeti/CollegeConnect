import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faHeart,
    faComment,

} from "@fortawesome/free-solid-svg-icons";

import { formatDistanceToNow } from 'date-fns';

import { faClock } from '@fortawesome/free-solid-svg-icons';

const PostReportDetailComponent = (props) => {
    const openUserPost = useRef(null);
    const { userDetail, selectedPost, postComment } = props;

    useEffect(() => {
        M.Modal.init(openUserPost.current);
    }, [props]);

    const cancelPostDetailModal = () => {
        const modalInstance = M.Modal.getInstance(openUserPost.current);
        modalInstance.close();
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
                                        src={selectedPost?.imageUrl}
                                        alt="Selected"
                                        className="img-fluid imgmodal"
                                    />
                                </div>
                            </div>
                            <div className="col-md-5 datamodal">
                                <div className="d-flex mt-2 post-detail-caption">

                                    <div className="creator_block_post">
                                        {userDetail?.profilePicture ===
                                            "default" ? (
                                            <img
                                                className="creator_image_post"
                                                src="/assets/profile.png"
                                                alt="profile Image"
                                            />
                                        ) : (
                                            <img
                                                className="creator_image_post"
                                                src={userDetail?.profilePicture}
                                                alt="Profile Image"
                                            />
                                        )}
                                    </div>
                                    <small>
                                        <span className="username fonting">
                                            {userDetail?.username}
                                        </span>
                                        <span className="user-caption ps-2 fw-light fonting">
                                            {selectedPost?.caption}
                                        </span>
                                    </small>

                                </div>

                                <hr></hr>
                                <div className="comments-container">

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

                                        </span><br />

                                        <p className="timestamp">

                                            <FontAwesomeIcon className="clock" icon={faClock} /> <span className="clock"> {' '}
                                                {formatDistanceToNow(new Date(postComment.createdDate), { addSuffix: true })}
                                            </span>
                                        </p>
                                    </div>

                                </div>

                                <div className="container-wrapper">
                                    <div className="divcontainer">
                                        <div className="d-flex flex-wrap post-details-stats likecontainer hrmargin">
                                            <div className="likecomment">
                                                <div>
                                                    <span>
                                                        <FontAwesomeIcon
                                                            icon={faHeart}

                                                        />
                                                    </span>

                                                    {selectedPost?.likes?.length == 0 ?
                                                        <small className='fs-6 fw-lighter'>
                                                            {selectedPost?.likes?.length} like</small>
                                                        : <span>
                                                            <small className='fs-6 fw-lighter'>
                                                                {selectedPost?.likes?.length} {selectedPost?.likes?.length == 1 ? 'like' : 'likes'}</small>
                                                        </span>}
                                                </div>

                                                <div>
                                                    <FontAwesomeIcon icon={faComment} />
                                                    <span className="p-2 fonting">
                                                        {selectedPost?.comments} comments
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="hrpad"></hr>

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

export default PostReportDetailComponent;
