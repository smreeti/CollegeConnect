import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css'
import fetchData from '../../utils/FetchAPI'
import { API_TO_FETCH_PROFILE_DETAILS } from '../../utils/APIRequestUrl'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default class UserViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.openUserPost = React.createRef();
        this.state = {
            userProfileDetails: {},
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
                                    <div className='px-2'>
                                        <p style={{ display: 'inline-block' }}>{userDetail?.username} <small>Lorem ipsum dolor sit amet</small></p>
                                    </div>
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