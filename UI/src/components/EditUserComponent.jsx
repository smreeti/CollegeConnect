import React from "react";
import fetchData from "../../utils/FetchAPI";
import { API_TO_FETCH_USER_DETAILS } from "../../utils/APIRequestUrl";
import Header from "../Header.jsx";
import EditProfilePhotoComponent from "./EditProfilePhotoComponent.jsx";
import { Link } from "react-router-dom";

export default class EditUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            userDetails: {},
            isEditProfilePhotoModal: false
        }
    }

    componentDidMount() {
        this.fetchUserDetails();
    }

    async fetchUserDetails() {
        try {
            const data = await fetchData(API_TO_FETCH_USER_DETAILS, "POST");
            this.setState({
                userDetails: data.body
            })
        } catch (error) {
            console.log("Error:", error);
        }
    }

    handleOnChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            userDetails: { ...prevState.userDetails, [name]: value }
        }));
    }

    openEditProfilePhotoModal = () => {
        this.setState({
            isEditProfilePhotoModal: true
        })
    }

    render() {

        const {
            userDetails: {
                firstName,
                lastName,
                email,
                mobileNumber,
                username,
                collegeInfoId,
                profilePicture
            },
        } = this.state;

        return (
            <>
                {/* <Header /> */}
                <section>
                    <form
                        id="editform"
                        name="editform"
                        method="POST"
                    >
                        <div>
                            <label>First Name</label>
                            <input type="text"
                                id="firstName"
                                value={firstName}
                                onChange={this.handleOnChange} />
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input type="text"
                                id="lastName"
                                value={lastName}
                                onChange={this.handleOnChange} />
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="text"
                                id="email"
                                value={email}
                                onChange={this.handleOnChange} />
                        </div>

                        <div>
                            <label>Mobile Number</label>
                            <input type="text"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={this.handleOnChange} />
                        </div>

                        <div>
                            <label>Username</label>
                            <input type="text"
                                id="username"
                                value={username}
                                onChange={this.handleOnChange} />
                        </div>

                        <div>
                            <label>College</label>
                            <input type="text"
                                id="collegeInfo"
                                value={collegeInfoId?.name}
                                onChange={this.handleOnChange} />
                        </div>

                        <div>
                            <label>Profile Picture </label>
                            {profilePicture === "default" ? (
                                <img id="prfimg" src="/assets/profile.png" alt="Profile" />
                            ) : (
                                <img
                                    id="prfimg"
                                    src={profilePicture}
                                    alt="Profile"
                                />
                            )}

                            <Link onClick={this.openEditProfilePhotoModal}
                                data-target="editProfilePicModal"
                                className="modal-trigger">Change profile photo </Link>
                        </div>

                        <button type="submit">Edit</button>
                    </form>

                    {this.state.isEditProfilePhotoModal && <EditProfilePhotoComponent />}
                </section>
            </>
        )
    }
}
