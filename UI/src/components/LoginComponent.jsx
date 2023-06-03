import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLoginFormValidation } from "../../utils/validation.js";
import { API_TO_LOGIN_USER } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
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
      [name]: value
    }));
  };

  const login = async (e) => {

    console.log("Log");
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
    <>
      <p>{serverErrors}</p>
      <div id="login-container" className="container">
        <div id='resrevtest' className="row  ">
          <div className="col-lg-6 logostyle">
            <img className="login-logo" src="../../assets/logotestnew.png" />
            <div className="login-form">
              <div className="user-details">
                <h2 className="color logfix">Login</h2>

                <form className='formset' id="form1" name="loginform" method="POST" onSubmit={login} >
                  <div className="form-group pad">
                    <input id="username"
                      name="username"
                      placeholder="Enter mobile no., username, or email "
                      value={user.username || ''}
                      onChange={handleOnChange}
                      key="UsernameInput"
                      className="formheight" />
                    <p className="required errormsg errpad1">{errors['username']}</p>
                  </div>

                  <div className="form-group secform pad">
                    <input id="password"
                      type='password'
                      name="password"
                      placeholder="Enter password"
                      value={user.password || ''}
                      onChange={handleOnChange}
                      key="PasswordInput"
                      className=" formheight formmar" />
                    <p className="required errormsg errpad1">{errors['password']}</p>
                  </div>
                  <p className="color forget">Forgot Password ? </p>
                  {/* <label className="signin">
                    <input type="checkbox" name="keep-signed-in" />
                    Keep me signed in
                  </label><br /> */}
                  <button className="btn btn-primary btnblack" type="submit">Login</button>
                  <h6 className="color">New User?
                    <Link to="/signup"> Create an account</Link></h6>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 bigimg p-0">
            <div className="action-section banimg">
              <img src="../../assets/testimg.jpg" alt="Image Placeholder" className="img-fluid banimg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
