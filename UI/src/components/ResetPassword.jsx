import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import TextInput from './InputComponents/TextInput.jsx';
import { handleResetPasswordValidation } from "../../utils/validation.js";
import { API_TO_RESET_PASSWORD } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";


const ResetPasswordComponent = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const resetPassword = async (e) => {
        e.preventDefault();

        const form = document.forms.resetPasswordForm;

        const user = {
            username: form.username.value,
        };

        let formErrors = await handleResetPasswordValidation(user);

        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
        } else {
            await resetPasswordUser(user);
        }
    }

    const resetPasswordUser = async (user) => {
        try {
            const data = await fetchData(API_TO_RESET_PASSWORD, "POST", user);
            if (!data.error) {
                console.log("Reset successful");
                navigate('/emailSent');
                // localStorage.setItem('jwt', accessToken);
                // localStorage.setItem('refreshToken', refreshToken);
                // localStorage.setItem('user', JSON.stringify(user));
            } else {
                setServerErrors(data.error);
                setFormErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
            setServerErrors(error);
        }
    }

    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
    };

    return (
        <>
            <div className="container min-vh-100 d-flex align-items-center justify-content-center">
                <div className="col-lg-6 col-md-8 col-11 p-3 bg-white px-md-5 py-md-4">
                    <div className="text-center">
                        <img className="login-logo" src="../../assets/logotestnew.png" />
                        <h2 className="mt-3">Reset Password</h2>
                        <p className="fs-6 mb-5">Fear not. We'll help you get your account back!</p>
                    </div>

                    <form name="resetPasswordForm" method="POST" onSubmit={resetPassword}>
                        <div className="fs-6">
                            <TextInput
                                id="username"
                                name="username"
                                placeholder="Enter mobile no., username, or email"
                                value={user.username || ''}
                                onChange={handleOnChange}
                                key="UsernameInput"
                                className="w-100 small rounded p-md-2 p-1 border"
                            />
                            <p className="text-danger small mb-3">{errors["username"]}</p>
                            <p className="text-danger small mb-3">{serverErrors}</p>

                        </div>

                        <div className="mt-3 text-center">
                            <button className="signup-submit-button rounded small">
                                <p className="small mb-0">
                                    Reset Password
                                </p>
                            </button>
                        </div>

                        <div className="d-flex mt-4">
                            <hr className="hr w-50" />
                            <p className="px-3 small">OR</p>
                            <hr className="hr w-50" />
                        </div>

                        <Link to="/signup" className="text-decoration-none text-center">
                            <p className="small">Create a new account</p>
                        </Link>

                    </form>
                </div >
            </div >
        </>
    )
}


export default ResetPasswordComponent;