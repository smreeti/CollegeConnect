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

    clearFields = () => {
        const form = document.forms.editform;
        form.firstName.value = "";
        form.lastName.value = "";
        form.email.value = "";
        form.mobileNumber.value = "";
        form.username.value = "";
      };

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
                <Header />

                {this.state?.serverErrors && (
                    <ul className="error-list text-danger">
                        {this.state?.serverErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}

<section className="usersection">
  <form
    id="editform"
    name="editform"
    method="POST"
    onSubmit={this.editProfile}
  >
    <div className="container rounded bg-white mb-5 spacing">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <label class="labels">Profile Picture </label>
            {profilePicture === "default" ? (
              <img
                class="edituserimg"
                src="/assets/profile.png"
                alt="Profile"
              />
            ) : (
              <img
                class="edituserimg rounded-circle imgmargin"
                src={profilePicture}
                alt="Profile"
               
                
              />
            )}
            <span class="font-weight-bold namespacing usernamespace">ayush</span>
          
            <span> </span>
            <div className="modcen">
            <Link
              onClick={this.openEditProfilePhotoModal}
              data-target="editProfilePicModal"
              className="modalcenter modal-trigger change-profile-photo-link modalcenter"
            >
              Change profile photo
            </Link>
            </div>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-centre ">Profile Settings</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels labelset">Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={firstName || ""}
                  onChange={this.handleOnChange}
                  type="text"
                  class="form-control labelset"
                  placeholder="first name"
                />
                <p className="required errormsg errpad1 labelset">
                  {this.state?.errors["firstName"]}
                </p>
              </div>

              <div class="col-md-6">
                <label class="labels labelset labelset ">Lastname</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName || ""}
                  onChange={this.handleOnChange}
                  class="form-control labelset"
                  placeholder="lastName"
                />
                <p className="required errormsg errpad1 labelset">
                  {this.state?.errors["lastName"]}
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <label class="labels labelset" labelset>Email ID</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email || ""}
                  onChange={this.handleOnChange}
                  class="form-control labelset"
                  placeholder="enter email id"
                />
              </div>

              <p className="required errormsg errpad1 labelset labelset">
                {this.state?.errors["email"]}
              </p>

              <div class="col-md-12">
                <label class="labels labelset">Mobile Number</label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={mobileNumber || ""}
                  onChange={this.handleOnChange}
                  class="form-control labelset"
                  placeholder="enter phone number"
                />
              </div>

              <p className="required errormsg errpad1 labelset">
                {this.state?.errors["mobileNumber"]}
              </p>

              <div class="col-md-12">
                <label class="labels labelset">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username || ""}
                  onChange={this.handleOnChange}
                  class="form-control labelset"
                  placeholder="education"
                />
              </div>

              <p className="required errormsg errpad1 labelset">
                {this.state?.errors["username"]}
              </p>

              <div class="col-md-12">
                <label class="labels labelset">College</label>
                <input
                  type="text"
                  id="collegeInfo"
                  name="collegeInfo"
                  value={collegeInfoId?.name || ""}
                  onChange={this.handleOnChange}
                  disabled
                  class="form-control labelset"
                  placeholder="education"
                />
              </div>
            </div>
          </div>
          <div class=" text-center btnspace">
            <button class="btnprofile" type="submit">
              Save Profile
            </button>

            <button class="btnprofile btnmargin" type="button" onClick={this.clearFields}>
            Clear Fields
          </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 py-5">
            <h4 class="text-center">About me</h4>
            <p class="text-center">
            I am a dedicated student currently pursuing my studies in web development at Conestoga College. With a passion for technology and a keen interest in the ever-evolving world of web development, I am committed to honing my skills and staying up-to-date with the latest industry trends.


            </p>
            <img
              src="../../assets/waterloo.jpg"
              alt="Additional Info"
              class="img-fluid"
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
