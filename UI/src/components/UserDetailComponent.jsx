import React, { useState, useEffect } from "react";
import fetchData from "../../utils/FetchAPI";
import { API_TO_EDIT_PROFILE, API_TO_FETCH_USER_DATA, } from "../../utils/APIRequestUrl";
import Header from "../Header.jsx";
import ResetUserPasswordModalComponent from "./ResetUserPasswordModalComponent.jsx";
import { useParams, useNavigate, Link } from "react-router-dom";
import { handleEditFormValidation } from "../../utils/Validation";
import EditProfilePhotoComponent from "./EditProfilePhotoComponent.jsx";
import BlockUserModalComponent from "./BlockUserModalComponent.jsx";

const UserDetailComponent = () => {
    const [userDetails, setUserDetails] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [isResetPasswordModal, setIsResetPasswordModal] = useState(false);
    const [isEditProfilePicture, setEditProfilePicture] = useState(false);
    const [isBlockUserModal, setBlockUserModal] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const { user, schoolName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const data = await fetchData(API_TO_FETCH_USER_DATA, "POST", { id: user });
            setUserDetails(data.body);
            setUserStatus(data.body.status);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [name]: value,
        }));
    };

    const editProfile = async (e) => {
        e.preventDefault();
        const form = document.forms.editform;

        const user = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            mobileNumber: form.mobileNumber.value,
            username: form.username.value,
            bio: form.bio ? form.bio.value : "",
            id: userDetails._id,
        };

        setServerErrors([]);
        const formErrors = await handleEditFormValidation(user);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            await edit(user);
            navigate(`/${schoolName}/users-list`)
        }
    };

    const edit = async (user) => {
        try {
            const data = await fetchData(API_TO_EDIT_PROFILE, "POST", user);
            if (!data.error) {
                if (!user.id) {
                    await updateLocalStorage(data.body);
                    window.location.reload();
                }
                console.log("User edited successfully");
            } else {
                setServerErrors([data.error]);
                setErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
            setServerErrors([error]);
        }
    }

    const updateLocalStorage = async (user) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
    }

    const clearFields = () => {
        const form = document.forms.editform;
        form.firstName.value = "";
        form.lastName.value = "";
        form.email.value = "";
        form.mobileNumber.value = "";
        form.username.value = "";
    };

    const openResetPasswordModal = () => {
        setIsResetPasswordModal(true);
    }

    const openEditProfilePhotoModal = () => {
        setEditProfilePicture(true);
    }

    const openBlockUserModal = () => {
        setBlockUserModal(true);
    }

    const {
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        collegeInfoId,
        profilePicture,
        bio,
    } = userDetails;

    return (
        <>
            <Header />
            <section className="usersection">
                <form id="editform" name="editform" method="POST" onSubmit={editProfile}>
                    <div className="container rounded bg-white mb-5 spacing">
                        <div className="row">
                            <div className="col-md-4 border-right">
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
                                    <span> </span>
                                    <div className="modcen">
                                        <Link
                                            onClick={openEditProfilePhotoModal}
                                            data-target="editProfilePicModal"
                                            className="modalcenter modal-trigger change-profile-photo-link modalcenter"
                                        >
                                            <span className="change"> Change profile photo</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-centre ">Edit Profile</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="firstName" className="labels labelset">Firstname</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                value={firstName || ""}
                                                onChange={handleOnChange}
                                                type="text"
                                                className="form-control labelset"
                                                placeholder="enter first name"
                                            />
                                            <p className="required errormsg errpad1 labelset">
                                                {errors["firstName"]}
                                            </p>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="lastName" className="labels labelset">Lastname</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={lastName || ""}
                                                onChange={handleOnChange}
                                                className="form-control labelset"
                                                placeholder="enter lastName"
                                            />
                                            <p className="required errormsg errpad1 labelset">
                                                {errors["lastName"]}
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
                                                onChange={handleOnChange}
                                                className="form-control labelset"
                                                placeholder="enter email id"
                                            />
                                        </div>

                                        <p className="required errormsg errpad1 labelset">
                                            {errors["email"]}
                                        </p>

                                        <div className="col-md-12">
                                            <label htmlFor="mobileNumber" className="labels labelset">Mobile Number</label>
                                            <input
                                                type="text"
                                                id="mobileNumber"
                                                name="mobileNumber"
                                                value={mobileNumber || ""}
                                                onChange={handleOnChange}
                                                className="form-control labelset"
                                                placeholder="enter phone number"
                                            />
                                        </div>

                                        <p className="required errormsg errpad1 labelset">
                                            {errors["mobileNumber"]}
                                        </p>

                                        <div className="col-md-12">
                                            <label htmlFor="username" className="labels labelset">Username</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={username || ""}
                                                onChange={handleOnChange}
                                                className="form-control labelset"
                                                placeholder="enter username"
                                            />
                                        </div>

                                        <p className="required errormsg errpad1 labelset">
                                            {errors["username"]}
                                        </p>

                                        <div className="col-md-12">
                                            <label htmlFor="collegeInfo" className="labels labelset">College</label>
                                            <input
                                                type="text"
                                                id="collegeInfo"
                                                name="collegeInfo"
                                                value={collegeInfoId?.name || ""}
                                                onChange={handleOnChange}
                                                disabled
                                                className="form-control labelset"
                                                placeholder="education"
                                            />
                                            <br />
                                        </div>
                                        <div className="col-md-12 ms-3">
                                            <Link onClick={openResetPasswordModal} className="modal-trigger" data-target="resetUserPasswordModal">
                                                <h6>Reset Password?</h6>
                                            </Link>

                                            <Link onClick={openBlockUserModal} className="modal-trigger"
                                                data-target="blockUserModal">
                                                <h6>{userStatus == "ACTIVE" ? "Block" : "Unblock"} user?</h6>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className=" text-center btnspace">
                                    <button className="btnprofile" type="submit">
                                        Save Profile
                                    </button>

                                    {serverErrors.length > 0 && (
                                        <ul className="error-list text-danger">
                                            {serverErrors.map((error, index) => (
                                                <li className="backenderror" key={index}>
                                                    {error}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {isResetPasswordModal && <ResetUserPasswordModalComponent userDetails={userDetails} />}
                {isBlockUserModal && <BlockUserModalComponent
                    userDetails={userDetails}
                    userStatus={userStatus}
                />}
                {isEditProfilePicture && <EditProfilePhotoComponent userDetails={userDetails._id} />}

            </section >

        </>
    );
}

export default UserDetailComponent;
