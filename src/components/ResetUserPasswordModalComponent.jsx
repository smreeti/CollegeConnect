import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { API_TO_RESET_PASSWORD, API_TO_UPDATE_PASSWORD } from "../../utils/APIRequestUrl";
import fetchData from "../../utils/FetchAPI";
import { getLoggedInUser } from '../../utils/Auth';

const ResetUserPasswordModalComponent = (props) => {
    const resetUserPasswordModal = useRef(null);
    const { userDetails } = props;
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        M.Modal.init(resetUserPasswordModal.current);
    }, [props]);


    const cancelModal = () => {
        const modalInstance = M.Modal.getInstance(resetUserPasswordModal.current);
        modalInstance.close();
    };

    const resetPasswordUser = async () => {
        const loggedInUser = getLoggedInUser();
        try {
            const data = await fetchData(API_TO_RESET_PASSWORD, "POST", { username: userDetails.username, loggedInUser });
            if (!data.error) {
                console.log("Reset successful");
                await updatePasswordUser(data.body);
                setConfirmationMessage("We've sent an email notification to the user about the new password.");
                cancelModal();
            } else {
                setFormErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
    };

    const updatePasswordUser = async (user) => {
        try {
            const data = await fetchData(API_TO_UPDATE_PASSWORD, "POST", { newPassword: user });
            if (!data.error) {
                console.log("Update successful");
            } else {
                setFormErrors([]);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div id="resetUserPasswordModal" className="modal" ref={resetUserPasswordModal} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirm Reset Password</h4>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close"
                            onClick={cancelModal}
                        />
                    </div>

                    {confirmationMessage ?
                        <>
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="success-check"
                            />
                            <b><p className="text-center">Thanks for updating the password </p></b>
                            <p>{confirmationMessage}</p>
                        </> :
                        <><div className="modal-body">
                            <p>Are you sure you want to reset {userDetails.username} password?</p>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success" onClick={() => { resetPasswordUser() }}>Yes</button>
                                <button className="btn btn-danger" type="button" onClick={cancelModal}>No</button>
                            </div>
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ResetUserPasswordModalComponent;