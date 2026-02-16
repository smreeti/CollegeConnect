import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../../utils/FetchAPI";
import { API_TO_DELETE_PROFILE } from "../../utils/APIRequestUrl";

const DeleteUserModalComponent = (props) => {
    const deleteUserModal = useRef(null);
    const { userDetails } = props;
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        M.Modal.init(deleteUserModal.current);
    }, [props]);

    const cancelModal = () => {
        const modalInstance = M.Modal.getInstance(deleteUserModal.current);
        modalInstance.close();
    };

    const deleteProfile = async () => {
        let data;

        data = await fetchData(API_TO_DELETE_PROFILE, "POST", { userId: userDetails._id });

        if (!data?.error) {
            setConfirmationMessage("Account deleted successfully. You will be logged out shortly");
            setTimeout(() => {
                window.location = '#/logout';
            }, 2000);
        } else {
            setFormErrors([]);
        }
    }

    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
    };

    return (
        <div id="deleteUserModal" className="modal" ref={deleteUserModal} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirm Block User</h4>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close"
                            onClick={cancelModal}
                        />
                    </div>

                    <div className="modal-body">
                        {!confirmationMessage && <>
                            <p>Are you sure you want to delete your profile, {userDetails.username}?</p>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success" onClick={deleteProfile}>Yes</button>
                                <button className="btn btn-danger" type="button" onClick={cancelModal}>No</button>
                            </div>
                        </>
                        }
                        <p> {confirmationMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserModalComponent;