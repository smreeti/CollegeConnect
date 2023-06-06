import React from "react";
import { Link } from "react-router-dom";

const EmailSentComponent = () => {

    return (
        <>
            <div className="container min-vh-100 d-flex align-items-center justify-content-center">
                <div className="col-lg-6 col-12 p-3 bg-white px-md-5 py-md-4">
                    <div className="text-center">
                        <img className="login-logo" src="../../assets/logotestnew.png" />
                        <p className="mt-md-4 mt-3">
                            We sent a link to your email to get back into your account.
                        </p>
                        <Link to="/resetPassword" className="text-decoration-none">Ok</Link>
                    </div>

                </div>
            </div>
        </>
    )
}
export default EmailSentComponent;