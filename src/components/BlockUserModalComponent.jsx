import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { API_TO_BLOCK_USER, API_TO_UNBLOCK_USER } from "../../utils/APIRequestUrl";
import fetchData from "../../utils/FetchAPI";

const BlockUserModalComponent = (props) => {
    const blockUserModal = useRef(null);
    const { userDetails, userStatus } = props;
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        M.Modal.init(blockUserModal.current);
    }, [props]);


    const cancelModal = () => {
        const modalInstance = M.Modal.getInstance(blockUserModal.current);
        modalInstance.close();
    };

    const handleBlock = async () => {
        let data;
        if (userStatus == "ACTIVE") {
            data = await fetchData(API_TO_BLOCK_USER, "POST", { userId: userDetails._id });
        } else if (userStatus == "BLOCKED") {
            data = await fetchData(API_TO_UNBLOCK_USER, "POST", { userId: userDetails._id });
        }

        if (!data?.error) {
            if (userStatus == "ACTIVE") {
                setConfirmationMessage("User blocked successfully and notification sent");
            } else if (userStatus == "BLOCKED") {
                setConfirmationMessage("User unblocked successfully");
            }
        } else {
            setServerErrors(data.error);
            setFormErrors([]);
        }
    }

    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
    };

    return (
        <div id="blockUserModal" className="modal" ref={blockUserModal} >
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

                        {confirmationMessage ?
                            <>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="success-check"
                                />
                                <p className="text-center">{confirmationMessage}</p>
                            </> : <>
                                <p>Are you sure you want to block {userDetails.username}?</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-success" onClick={handleBlock}>Yes</button>
                                    <button className="btn btn-danger" type="button" onClick={cancelModal}>No</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BlockUserModalComponent;