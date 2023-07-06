import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_FETCH_PROFILE_DETAILS } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

export default class UserViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.openUserPost = React.createRef();
        this.state = {
            userProfileDetails: {},
            likes: 0,
            isLiked: false,

        };
    }

    componentDidMount() {
        this.fetchUserProfileDetails();
        M.Modal.init(this.openUserPost.current);
    }

    cancelUserPostModal = () => {
        console.log('Cancelling modal');
        const modalInstance = M.Modal.getInstance(this.openUserPost.current);
        console.log(modalInstance); // Log the modal instance to the console
        modalInstance.close();
    };

    likedIcon = () => {
        const { isLiked, likes } = this.state;
        this.setState({
            likes: isLiked ? likes - 1 : likes + 1,
            isLiked: !isLiked
        });
    };

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
        const { userProfileDetails: { posts, userDetail }, likes, isLiked } = this.state;
        const { selectedImage, selectedCaption, username } = this.props;
        return (
            <div id="openUserPost" className="modal modcen p-5" ref={this.openUserPost}>
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="close"
                                style={{ cursor: 'pointer' }}
                                onClick={this.cancelUserPostModal}
                            />
                        </div>
                        <div className="modal-body" >
                            <div className="d-flex justify-content-between">
                                <div className="col-9">
                                    {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '300px', height: '350px' }} />}

                                </div>
                                <div className="col-3">
                                    <div className='text-wrap'>
                                        <p>{userDetail?.username}:</p> <p className='user-caption'>Lorem ipsum dolor sit amet</p>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        <FontAwesomeIcon icon={faHeart} className='me-3' color={isLiked ? 'red' : 'gray'} onClick={this.likedIcon} />
                                        <FontAwesomeIcon icon={faComment} />
                                    </div>
                                    {likes > 0 ? <p className='likes'>Liked by {this.state.likes} people</p> : null}
                                    {posts?.length > 0 && (
                                        posts.map((post) => (
                                            <Link>
                                                <div>
                                                    {post.comments.length > 0 && <small>View {post.comments.length} comments</small>}
                                                </div>
                                            </Link>
                                        ))
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Title</h4>

                            <FontAwesomeIcon
                                icon={faTimes}
                                className="close"
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.cancelUserPostModal}
                            />
                        </div>
                        <div className="modal-body" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '350px', height: '400px' }} />}
                                <div>
                                    <p>{selectedCaption}</p>
                                    <p>{userDetail?.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}