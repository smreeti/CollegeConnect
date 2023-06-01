import React from "react";
import Button from "react-bootstrap/Button";
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
                {/* <div id="particles-js"></div> */}

                <section className="signup-container">
                    <div className="row bg-white p-5">
                        <div className="col-md-6 col-12">
                            <h2>Create An Account</h2>
                            <p className="pb-2">Already a user? <Link to="/login">Sign In</Link></p>
                            <form name="signupform" method="POST" onSubmit={this.signup}>
                                {this.state?.serverErrors && (
                                    <ul className="error-list text-danger">
                                        {this.state?.serverErrors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                )}

                                <div>
                                    <div className="row d-flex">
                                        <div className="col">
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
                                            </div>
                                        </div>
                                        <div className="col">
                                            <TextInput
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={this.handleOnChange}
                                                key="LastNameInput"
                                                className="w-100" />
                                            <p className="text-danger">{this.state?.errors["lastName"]}</p>
                                        </div>
                                    </div>
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
                                </div>

                                <div className="mt-4">
                                    <button className="signup-submit-button w-100">Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 col-md-6 logo-section">
                            <img src="f78eccbd65dd5451e8809434a4f881b7.png" alt="Image Placeholder" />
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default SignupComponent;