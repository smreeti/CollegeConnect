import React from "react";
import { Link } from "react-router-dom";

const EmailSentComponent = () => {

    return (
        <section className="main-section">
            <div className="container min-vh-100 d-flex align-items-center justify-content-center">
                <div className="col-lg-6 col-12 p-3 bg-white px-md-5 py-md-4">
                    <div className="text-center">
                        <img className="login-logo" src="../../assets/logo.png" />
                        <p className="mt-md-4 mt-3">
                            We sent a link to your email to get back into your account.
                        </p>
                        <Link to="/resetPassword" className="mt-3">Ok</Link>

                        <div className="d-flex mt-3">
                            <hr className="hr w-50" />
                            <small className="px-3 small">OR</small>
                            <hr className="hr w-50" />
                        </div>

                        <Link to="/" className="text-center">
                            <p className="small">Back to Login</p>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default EmailSentComponent;