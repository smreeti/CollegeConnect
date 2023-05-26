import React from "react";
import TextInput from './InputComponents/TextInput.jsx';
import NumInput from './InputComponents/NumInput.jsx';
import SelectInput from './InputComponents/SelectInput.jsx';
import UserType from "../../utils/UserTypeConstants.js";
import handleFormValidation from "../../utils/validation.js";

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
        await fetch("http://localhost:4000/fetchCollegeList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(data => {
                if (data?.error?.length > 0)
                    console.log("err");
                else {
                    this.setState({
                        collegeInfoList: data
                    })
                }
            }).catch(error => {
                console.log(error);
            })
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

        await fetch("http://localhost:4000/signupUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                if (data?.error?.length > 0) {
                    this.setServerErrors(data.error);
                    this.setFormErrors([]);
                }
                else
                    console.log("User saved successfully");
            }).catch(error => {
                console.log(error);
                this.setServerErrors(error);
            })
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
                <section>
                    <h1>Sign up</h1>
                    <form name="signupform" method="POST" onSubmit={this.signup}>
                        {this.state?.serverErrors && (
                            <ul className="error-list">
                                {this.state?.serverErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}

                        <div>
                            <label htmlFor="firstName"><b>First Name</b></label>
                            <span className="required">*</span>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={this.handleOnChange}
                                key="FirstNameInput"
                            />
                            <p className="required">{this.state?.errors["firstName"]}</p>

                            <label htmlFor="lastName"><b>Last Name</b></label>
                            <span className="required">*</span>
                            <TextInput
                                id="lastName"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={this.handleOnChange}
                                key="LastNameInput"
                            />
                            <p className="required">{this.state?.errors["lastName"]}</p>

                            <label htmlFor="email"><b>Email</b></label>
                            <span className="required">*</span>
                            <TextInput
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={this.handleOnChange}
                                key="EmailInput"
                            />
                            <p className="required">{this.state?.errors["email"]}</p>

                            <label htmlFor="mobileNumber"><b>Mobile Number</b></label>
                            <span className="required">*</span>
                            <NumInput
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={this.handleOnChange}
                                key="MobileNumberInput"
                            />
                            <p className="required">{this.state?.errors["mobileNumber"]}</p>

                            <label htmlFor="username"><b>Username</b></label>
                            <span className="required">*</span>
                            <TextInput
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={this.handleOnChange}
                                key="UsernameInput"
                            />
                            <p className="required">{this.state?.errors["username"]}</p>

                            <label htmlFor="password"><b>Password</b></label>
                            <span className="required">*</span>
                            <TextInput
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={this.handleOnChange}
                                key="PasswordInput"
                            />
                            <p className="required">{this.state?.errors["password"]}</p>

                            <label htmlFor="college"><b>College</b></label>
                            <span className="required">*</span>

                            <select
                                value={selectedCollege}
                                name="selectedCollege"
                                id="selectedCollege"
                                onChange={this.handleOnChange}
                            >
                                {selectCollegeOptions}
                            </select>
                        </div>

                        <div>
                            <button>Sign up</button>
                        </div>
                    </form>
                </section>
            </>
        )
    }
}

export default SignupComponent;