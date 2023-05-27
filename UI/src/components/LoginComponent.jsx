import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from './InputComponents/TextInput.jsx';
import { handleLoginFormValidation } from "../../utils/validation.js";
import { API_TO_LOGIN_USER } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";

const LoginComponent = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const login = async (e) => {
        e.preventDefault();

        const form = document.forms.loginform;
        const user = {
            username: form.username.value,
            password: form.password.value
        };

        let formErrors = await handleLoginFormValidation(user);
        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
        } else {
            await loginUser(user);
        }
    };

    const loginUser = async (user) => {
        try {
            const data = await fetchData(API_TO_LOGIN_USER, "POST", user);

            console.log(data);
            if (!data.error) {
                const { token, user } = data.body;
                localStorage.setItem("jwt", token)
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/home');
            } else {
                setServerErrors(data.error);
                setFormErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
            setServerErrors(error);
        }
    };

    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
    };

    return (
        <main>
            <h1>Login</h1>

            <p>{serverErrors}</p>
            <form name="loginform" method="POST" onSubmit={login}>
                <div>
                    <label htmlFor="username">
                        <b>Mobile number, username, or email address</b>
                    </label>
                    <span className="required">*</span>

                    <TextInput
                        id="username"
                        name="username"
                        placeholder="Enter mobile number, username, or email address"
                        value={user.username || ""}
                        onChange={handleOnChange}
                        key="UsernameInput"
                    />
                    <p className="required">{errors["username"]}</p>

                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <span className="required">*</span>
                    <TextInput
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={user.password || ""}
                        onChange={handleOnChange}
                        key="PasswordInput"
                    />
                    <p className="required">{errors["password"]}</p>
                </div>

                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
    );
};

export default LoginComponent;
