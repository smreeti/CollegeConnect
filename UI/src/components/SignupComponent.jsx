import React from "react";
import TextInput from './InputComponents/TextInput.jsx';
import NumInput from './InputComponents/NumInput.jsx';
import UserType from "../../utils/UserTypeConstants.js";
import { handleFormValidation } from "../../utils/validation.js";
import { API_TO_FETCH_COLLEGE_INFO, API_TO_SIGNUP_USER } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
import { Link } from "react-router-dom";

class SignupComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            errors: [],
            serverErrors: [],
            collegeInfoList: []
        };
        this.signup = this.signup.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.fetchCollegeList = this.fetchCollegeList.bind(this);
    }

    componentDidMount() {
        this.fetchCollegeList();
    }

    async fetchCollegeList() {
        try {
            const data = await fetchData(API_TO_FETCH_COLLEGE_INFO, "GET");
            if (!data.error) {
                this.setState({
                    collegeInfoList: data.body
                });
            } else {
                console.log("Error:", data.error);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    async signup(e) {
        e.preventDefault();

        const form = document.forms.signupform;

        const user = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            mobileNumber: form.mobileNumber.value,
            username: form.username.value,
            password: form.password.value,
            userType: UserType.REGULAR_USER,
            collegeInfoId: form.selectedCollege.value
        }

        this.setServerErrors([]);
        let formErrors = await handleFormValidation(user);

        if (Object.keys(formErrors).length > 0) {
            this.setFormErrors(formErrors);
        } else {
            await this.signupUser(user);
            window.location = '/';
        }
    }

    handleOnChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value }
        }));
    }

    async signupUser(user) {

        try {
            const data = await fetchData(API_TO_SIGNUP_USER, "POST", user);
            if (!data.error) {
                console.log("User saved successfully");
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
            serverErrors: serverErrors
        });
    }

    render() {
        const {
            user: {
                firstName,
                lastName,
                email,
                mobileNumber,
                username,
                password,
                selectedCollege
            }
        } = this.state;

        const selectCollegeOptions = this.state.collegeInfoList.map((college) => (
            <option key={college._id} value={college._id}>
                {college.name}
            </option>
        ));

        return (
            <>
                <section className="signup-container px-md-5 pt-md-4">
                    <div className="row bg-white w-75">
                        <div className="col-lg-6 col-12 text-center p-5 px-md-5 py-md-4">
                            <img className="login-logo" src="../../assets/logotestnew.png" />
                            <h2 className="mt-3">Create An Account</h2>
                            <p className="fs-6">Already a user? <Link to="/">Sign In</Link></p>
                            <form name="signupform" method="POST" onSubmit={this.signup}>
                                {this.state?.serverErrors && (
                                    <ul className="error-list text-danger">
                                        {this.state?.serverErrors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                )}

                                <div>
                                    <TextInput
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={this.handleOnChange}
                                        key="FirstNameInput"
                                        className="w-100"
                                    />
                                    <p className="text-danger">{this.state?.errors["firstName"]}</p>
                                    <TextInput
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={this.handleOnChange}
                                        key="LastNameInput"
                                        className="w-100" />
                                    <p className="text-danger">{this.state?.errors["lastName"]}</p>
                                    <TextInput
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={this.handleOnChange}
                                        key="EmailInput"
                                        className="w-100"
                                    />
                                    <p className="text-danger">{this.state?.errors["email"]}</p>

                                    <NumInput
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        placeholder="Phone Number"
                                        value={mobileNumber}
                                        onChange={this.handleOnChange}
                                        key="MobileNumberInput"
                                        className="w-100"
                                    />
                                    <p className="text-danger">{this.state?.errors["mobileNumber"]}</p>

                                    <TextInput
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={this.handleOnChange}
                                        key="UsernameInput"
                                        className="w-100"
                                    />
                                    <p className="text-danger">{this.state?.errors["username"]}</p>

                                    <TextInput
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={this.handleOnChange}
                                        key="PasswordInput"
                                        className="w-100"
                                    />
                                    <p className="text-danger">{this.state?.errors["password"]}</p>

                                    <select
                                        value={selectedCollege}
                                        name="selectedCollege"
                                        id="selectedCollege"
                                        onChange={this.handleOnChange}
                                        className="w-100"
                                    >
                                        {selectCollegeOptions}
                                    </select>
                                    <p className="text-danger">{this.state?.errors["selectedCollege"]}</p>

                                </div>

                                <div className="mt-3">
                                    <button className="signup-submit-button w-100">Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 col-md-6 image-section px-0 d-none d-lg-block">
                            <img src="5a051759006413a0fc9ea48a50df14c3.jpg" alt="Image Placeholder" />
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default SignupComponent;