import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLoginFormValidation } from '../../utils/validation.js';
import { API_TO_LOGIN_USER } from '../../utils/APIRequestUrl.js';
import fetchData from '../../utils/FetchAPI.js';
import { Link } from 'react-router-dom';

const LoginComponent = () => {
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
  };

  const login = async (e) => {
    console.log('Log');
    e.preventDefault();

    const form = document.forms.loginform;
    const user = {
      username: form.username.value,
      password: form.password.value,
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
      const data = await fetchData(API_TO_LOGIN_USER, 'POST', user);

      console.log(data);
      if (!data.error) {
        const { token, user } = data.body;
        localStorage.setItem('jwt', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        setServerErrors(data.error);
        setFormErrors([]);
      }
    } catch (error) {
      console.log('Error:', error);
      setServerErrors(error);
    }
  };

  const setFormErrors = (formErrors) => {
    setErrors(formErrors);
  };

  return (
    <div className="main-container">
      <div id="main-login-container">
        <div id="login-form-container">
          <div className="login-details">
            <img className="login-logo" src="../../assets/logotestnew.png" />
            <h2 className="color logfix">Login</h2>
          </div>
          <form
            className="formset"
            id="form1"
            name="loginform"
            method="POST"
            onSubmit={login}
          >
            <div className="form-group pad">
              <input
                id="username"
                name="username"
                placeholder="Enter mobile no., username, or email "
                value={user.username || ''}
                onChange={handleOnChange}
                key="UsernameInput"
                className="formheight"
              />
              <p className="required errormsg errpad1">{errors['username']}</p>
            </div>

            <div className="form-group secform pad">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={user.password || ''}
                onChange={handleOnChange}
                key="PasswordInput"
                className=" formheight formmar"
              />
              <p className="required errormsg errpad1">{errors['password']}</p>
            </div>

            <p>{serverErrors}</p>

            <p className="color forget">Forgot Password ? </p>
            <button className="btn btn-primary btnblack" type="submit">
              Login
            </button>
            <h6 className="color">
              New User?
              <Link to="/signup"> Create an account</Link>
            </h6>
          </form>
        </div>
        <div id="login-image">
          <img src="../../assets/testimg.jpg" alt="Image Placeholder" />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
