import React from "react";
import fetchData from "../../utils/FetchAPI";
import { API_TO_EDIT_PROFILE, API_TO_FETCH_USER_DETAILS } from "../../utils/APIRequestUrl";
import Header from "../Header.jsx";
import EditProfilePhotoComponent from "./EditProfilePhotoComponent.jsx";
import { Link } from "react-router-dom";
import { handleEditFormValidation, handleFormValidation } from "../../utils/validation";

export default class EditUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            userDetails: {},
            isEditProfilePhotoModal: false,
            errors: [],
            serverErrors: []
        };
    }

    componentDidMount() {
        this.fetchUserDetails();
    }

    async fetchUserDetails() {
        try {
            const data = await fetchData(API_TO_FETCH_USER_DETAILS, "POST");
            this.setState({
                userDetails: data.body
            });
        } catch (error) {
            console.log("Error:", error);
        }
    }

    handleOnChange = (event) => {
        const { name, value } = event.target;

        this.setState(prevState => ({
            userDetails: { ...prevState.userDetails, [name]: value }
        }));
    };

    openEditProfilePhotoModal = () => {
        this.setState({
            isEditProfilePhotoModal: true
        });
    };

    editProfile = async (e) => {
        e.preventDefault();

        const form = document.forms.editform;

        const user = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            mobileNumber: form.mobileNumber.value,
            username: form.username.value,
        };

        this.setServerErrors([]);
        let formErrors = await handleEditFormValidation(user);

        if (Object.keys(formErrors).length > 0) {
            this.setFormErrors(formErrors);
        } else {
            await this.edit(user);
        }
    };

    async edit(user) {
        try {
            const data = await fetchData(API_TO_EDIT_PROFILE, "POST", user);
            if (!data.error) {
                window.location.reload();
                console.log("User edited successfully");
            } else {
                this.setServerErrors(data.error);
                this.setFormErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
            this.setServerErrors(error);
        }
    }

    setFormErrors(formErrors) {
        this.setState({
            errors: formErrors
        });
    }

    setServerErrors(serverErrors) {
        this.setState({
            serverErrors: [serverErrors],
        });
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

                {this.state?.serverErrors && (
                    <ul className="error-list text-danger">
                        {this.state?.serverErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}

                <section>
                    <form
                        id="editform"
                        name="editform"
                        method="POST"
                        onSubmit={this.editProfile}
                    >
                        <div>
                            <label>First Name</label>
                            <input type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName || ""}
                                onChange={this.handleOnChange}
                            />
                            <p className="text-danger small mb-3">{this.state?.errors["firstName"]}</p>
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName || ""}
                                onChange={this.handleOnChange}
                            />
                            <p className="text-danger small mb-3">{this.state?.errors["lastName"]}</p>
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="text"
                                id="email"
                                name="email"
                                value={email || ""}
                                onChange={this.handleOnChange}
                            />
                            <p className="text-danger small mb-3">{this.state?.errors["email"]}</p>
                        </div>

                        <div>
                            <label>Mobile Number</label>
                            <input type="text"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={mobileNumber || ""}
                                onChange={this.handleOnChange}
                            />
                            <p className="text-danger small mb-3">{this.state?.errors["mobileNumber"]}</p>
                        </div>

                        <div>
                            <label>Username</label>
                            <input type="text"
                                id="username"
                                name="username"
                                value={username || ""}
                                onChange={this.handleOnChange}
                            />
                            <p className="text-danger small mb-3">{this.state?.errors["username"]}</p>
                        </div>

                        <div>
                            <label>College</label>
                            <input type="text"
                                id="collegeInfo"
                                name="collegeInfo"
                                value={collegeInfoId?.name || ""}
                                onChange={this.handleOnChange}
                                disabled
                            />
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
        );
    }
}
