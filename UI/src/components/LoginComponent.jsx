import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from './InputComponents/TextInput.jsx';
import { handleLoginFormValidation } from "../../utils/validation.js";
import { API_TO_LOGIN_USER } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";
// import { Link } from 'react-router-dom';




const LoginComponent = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const labelTitle="Input"

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
        
      <section>
         <p>{serverErrors}</p>
         <div className="main-form-container">
      <div id="form_section" className="form-container">
        <div className="login-form form-wraper">
          <form name="loginform" method="POST" onSubmit={login}>
            <div>
              <div className="form-title">
              <img src="../../public/assets/logotestnew" /> 
              </div>

              <div className="input-group">
                <TextInput
                  id="username"
                  name="username"
                  placeholder="Enter mobile no., username, or email "
                  value={user.username || ''}
                  onChange={handleOnChange}
                  key="UsernameInput"
                  className="inpt_field"
                />
                <p className="required errormsg">{errors['username']}</p>
              </div>
              <div className="input-group">
                <TextInput
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={user.password || ''}
                  onChange={handleOnChange}
                  key="PasswordInput"
                  className="inpt_field"
                />
                <p className="required errormsg">{errors['password']}</p>
              </div>
              <div className="forget-password">
                <a href="">FORGOT PASSWORD ?</a>
              </div>
              <div className="action-button">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
        <div className="signUp-form form-wraper">
          <div>
            <div className="form-title">
              <h2>Sign Up</h2>
            </div>
            <div className="input-group">
              <div className="box">
                <span>
                  <input placeholder="Full Name" className="myInput" type="text" />
                </span>
              </div>
            </div>
            <div className="input-group">
              <div className="box">
                <span>
                  <input placeholder="Email" className="myInput" type="text" />
                </span>
              </div>
            </div>
            <div className="input-group">
              <div className="box">
                <span>
                  <input placeholder="Mobile No." className="myInput" type="number" />
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '0px' }} className="input-group">
              <div className="box">
                <span>
                  <input placeholder="Password" className="myInput" type="password" />
                </span>
              </div>
            </div>
            <div className="action-button">
              <button>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <div id="multiple-btn" className="bg-btn-container">
        <div className="action-button">
        <p className="noacc">Don't have an account?</p>
        </div>
        <div className="action-button">
        <button onClick={() => navigate('/signup')} >Sign Up</button>
        </div>
      </div>
    </div>
    </section>
     
    );
};

export default LoginComponent;
