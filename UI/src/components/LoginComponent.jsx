import React from 'react';
import TextInput from './InputComponents/TextInput.jsx';
import { handleLoginFormValidation } from "../../utils/validation.js";
import { API_TO_LOGIN_USER } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";

export default class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            errors: [],
            serverErrors: []
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleOnChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value }
        }));
    }

    async login(e) {
        e.preventDefault();

        const form = document.forms.loginform;
        const user = {
            username: form.username.value,
            password: form.password.value
        }

        let formErrors = await handleLoginFormValidation(user);
        if (Object.keys(formErrors).length > 0) {
            this.setFormErrors(formErrors);
        } else {
            await this.loginUser(user);
        }
    }

    async loginUser(user) {
        try {
            const data = await fetchData(API_TO_LOGIN_USER, "POST", user);

            if (!data.error) {
                console.log("User logged in successfully");
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
                username,
                password
            }
        } = this.state;

        return (
            <main>
                <h1>Login</h1>

                <p>{this.state?.serverErrors}</p>
                <form name="loginform" method="POST" onSubmit={this.login}>
                    <div>
                        <label htmlFor="username"><b>Mobile number, username or email address</b></label>
                        <span className="required">*</span>

                        <TextInput
                            id="username"
                            name="username"
                            placeholder="Enter mobile number, username or email address"
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
                    </div>

                    <div>
                        <button>Login</button>
                    </div>
                </form>
            </main>
        );
    }
}
