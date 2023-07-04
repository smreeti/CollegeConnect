import React, { useRef, useEffect, useState } from "react";
import Header from "../Header.jsx";
import { API_TO_FETCH_PROFILE_DETAILS } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";

export default class UserViewPost extends React.Component {
    constructor() {
        super();
        this.state = {
            userProfileDetails: {},
        };
        this.openUserPost = React.createRef();
    }

    componentDidMount() {
        this.fetchUserProfileDetails();
        M.Modal.init(this.openUserPost.current);
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

    // cancelModal = () => {

    //     setPost({
    //         caption: "",
    //         image: null,
    //     });

    //     // Reset the file input field
    //     const fileInput = document.getElementById("image");
    //     if (fileInput)
    //         fileInput.value = null;

    //     setErrors([]);
    //     setServerErrors([]);

    //     const modalInstance = M.Modal.getInstance(createPostModal.current); //close modal
    //     modalInstance.close();
    // };

    render() {
        const { userProfileDetails: { posts, userDetail } } = this.state;

        return (
            <>
                <div id="openUserPost" className="modal modcen" ref={openUserPost}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{posts.imageUrl}</h4>

                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="close"
                                    onClick={cancelModal}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </>

        );
    }
}
