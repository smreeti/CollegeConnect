import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import TextInput from './InputComponents/TextInput.jsx';
import { handleUpdatePasswordValidation } from "../../utils/validation.js";
import { API_TO_UPDATE_PASSWORD } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
import { useParams } from 'react-router-dom';


const UpdatePasswordComponent = () => {
    const { id } = useParams();
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

    const updatePassword = async (e) => {
        e.preventDefault();

        const form = document.forms.updatePasswordForm;
        const confirmPassword = form.confirmPassword.value;
        const user = {
            newPassword: form.password.value,
            token: id
        };

        let formErrors = await handleUpdatePasswordValidation(confirmPassword, user.newPassword);

        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
        } else {
            console.log("Match success");
            await updatePasswordUser(user);
        }
    }

    const updatePasswordUser = async (user) => {
        try {
            const data = await fetchData(API_TO_UPDATE_PASSWORD, "POST", user);
            if (!data.error) {
                console.log("Update successful");
                navigate('/');
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
                        <h2 className="mt-3">Create New Password</h2>
                        <p className="fs-6 mb-5">A strong password helps prevent unauthorised access to your account</p>
                    </div>

                    <form name="updatePasswordForm" method="POST" onSubmit={updatePassword}>
                        <div className="fs-6">
                            <TextInput
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={user.newPassword || ''}
                                onChange={handleOnChange}
                                key="PasswordInput"
                                type="password"
                                className="w-100 small rounded p-md-2 p-1 border"
                            />
                            <p className="text-danger small mb-3">{errors["password"]}</p>


                            <TextInput
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleOnChange}
                                key="ConfirmPasswordInput"
                                type="password"
                                className="w-100 small rounded p-md-2 p-1 border"
                            />
                            <p className="text-danger small mb-3">{errors["confirmPassword"]}</p>

                            <p className="text-danger small mb-3">{serverErrors}</p>

                        </div>

                        <div className="mt-5 text-center">
                            <button className="signup-submit-button rounded small">
                                <p className="small mb-0">
                                    Update Password
                                </p>
                            </button>
                        </div>
                        <div className="d-flex mt-3">
                            <hr className="hr w-50" />
                            <small className="px-3 small">OR</small>
                            <hr className="hr w-50" />
                        </div>

                        <Link to="/" className="text-center">
                            <p className="small">Back to Login</p>
                        </Link>

                    </form>
                </div >
            </div >
        </>
    )
}


export default UpdatePasswordComponent;