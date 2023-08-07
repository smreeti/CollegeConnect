import React from "react";
import fetchData from "../../utils/FetchAPI";
import { API_TO_EDIT_PROFILE, API_TO_FETCH_USER_DETAILS } from "../../utils/APIRequestUrl";
import Header from "../Header.jsx";
import EditProfilePhotoComponent from "./EditProfilePhotoComponent.jsx";
import { Link } from "react-router-dom";
import { handleEditFormValidation } from "../../utils/validation";

export default class EditProfileComponent extends React.Component {
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
            bio: form.bio ? form.bio.value : ""
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
                await this.updateLocalStorage(data.body);
                const data = await fetchData(API_TO_APPROVE_POST_REPORTS, "POST", user);
                if (!data.error)
                    toast.success("Post report approved successfully!");
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

    async updateLocalStorage(user) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
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

    clearFields = () => {
        const form = document.forms.editform;
        form.firstName.value = "";
        form.lastName.value = "";
        form.email.value = "";
        form.mobileNumber.value = "";
        form.username.value = "";
    };

    async sendNotification() {

        let formErrors = handleReportPostForm();
        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
        } else {
            const reportData = {
                postReportsId: selectedPostId,
                remarks
            };

            if (action == "APPROVE") {
                const data = await fetchData(API_TO_APPROVE_POST_REPORTS, "POST", reportData);

                if (!data.error)
                    toast.success("Post report approved successfully!");

            } else if (action == "REJECT") {
                const data = await fetchData(API_TO_REJECT_POST_REPORTS, "POST", reportData);

                if (!data.error)
                    toast.error("Post report rejected successfully!");
            }

            cancelModal();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
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
                profilePicture,
                bio
            }
        } = this.state;

        return (
            <>
                <Header />

                <section className="usersection">
                    <form
                        id="editform"
                        name="editform"
                        method="POST"
                        onSubmit={this.editProfile}
                    >
                        <div className="container rounded bg-white mb-5 spacing">
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5 resimdiv">
                                        {profilePicture === "default" ? (
                                            <img
                                                className="edituserimg"
                                                src="/assets/defaultProfileImage.png"
                                                alt="Profile"
                                            />
                                        ) : (
                                            <img
                                                className="edituserimg rounded-circle imgmargin"
                                                src={profilePicture}
                                                alt="Profile"
                                            />
                                        )}
                                        <span className="font-weight-bold namespacing usernamespace">{firstName + " " + lastName}</span>
                                        <span> </span>
                                        <div className="modcen">
                                            <Link
                                                onClick={this.openEditProfilePhotoModal}
                                                data-target="editProfilePicModal"
                                                className="modalcenter modal-trigger change-profile-photo-link modalcenter"
                                            >
                                                <span className="change"> Change profile photo</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 border-right">
                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-centre ">Profile Settings</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label htmlFor="firstName" className="labels labelset">Firstname</label>
                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    value={firstName || ""}
                                                    onChange={this.handleOnChange}
                                                    type="text"
                                                    className="form-control labelset"
                                                    placeholder="enter first name"
                                                />
                                                <p className="required errormsg errpad1 labelset">
                                                    {this.state?.errors["firstName"]}
                                                </p>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="labels labelset">Lastname</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={lastName || ""}
                                                    onChange={this.handleOnChange}
                                                    className="form-control labelset"
                                                    placeholder="enter lastName"
                                                />
                                                <p className="required errormsg errpad1 labelset">
                                                    {this.state?.errors["lastName"]}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="email" className="labels labelset">Email ID</label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    value={email || ""}
                                                    onChange={this.handleOnChange}
                                                    className="form-control labelset"
                                                    placeholder="enter email id"
                                                />
                                            </div>

                                            <p className="required errormsg errpad1 labelset">
                                                {this.state?.errors["email"]}
                                            </p>

                                            <div className="col-md-12">
                                                <label htmlFor="mobileNumber" className="labels labelset">Mobile Number</label>
                                                <input
                                                    type="text"
                                                    id="mobileNumber"
                                                    name="mobileNumber"
                                                    value={mobileNumber || ""}
                                                    onChange={this.handleOnChange}
                                                    className="form-control labelset"
                                                    placeholder="enter phone number"
                                                />
                                            </div>

                                            <p className="required errormsg errpad1 labelset">
                                                {this.state?.errors["mobileNumber"]}
                                            </p>

                                            <div className="col-md-12">
                                                <label htmlFor="username" className="labels labelset">Username</label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    value={username || ""}
                                                    onChange={this.handleOnChange}
                                                    className="form-control labelset"
                                                    placeholder="enter username"
                                                />
                                            </div>

                                            <p className="required errormsg errpad1 labelset">
                                                {this.state?.errors["username"]}
                                            </p>

                                            <div className="col-md-12">
                                                <label htmlFor="collegeInfo" className="labels labelset">College</label>
                                                <input
                                                    type="text"
                                                    id="collegeInfo"
                                                    name="collegeInfo"
                                                    value={collegeInfoId?.name || ""}
                                                    onChange={this.handleOnChange}
                                                    disabled
                                                    className="form-control labelset"
                                                    placeholder="education"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" text-center btnspace">
                                        <button className="btnprofile" type="submit">
                                            Save Profile
                                        </button>

                                        {this.state?.serverErrors && (
                                            <ul className="error-list text-danger">
                                                {this.state?.serverErrors.map((error, index) => (
                                                    <li className="backenderror" key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* <button className="btnprofile btnmargin" type="button" onClick={this.clearFields}>
                                            Clear Fields
                                        </button> */}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 py-5">
                                        <h4 className="text-center">About me</h4>

                                        <textarea
                                            value={bio}
                                            onChange={this.handleOnChange}
                                            className="form-control bio"
                                            row="3"
                                            name="bio"
                                            placeholder="Enter your bio"
                                        ></textarea>

                                        <img
                                            src="../../assets/waterloo.jpg"
                                            alt="Additional Info"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    {this.state.isEditProfilePhotoModal && <EditProfilePhotoComponent />}
                </section>
            </>
        );
    }
}
