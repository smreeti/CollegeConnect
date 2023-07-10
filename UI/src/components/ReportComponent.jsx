import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ReportComponent = () => {
    const reportModal = useRef(null);

    useEffect(() => {
        M.Modal.init(reportModal.current);
    }, []);


    const cancelModal = () => {
        const modalInstance = M.Modal.getInstance(reportModal.current);
        modalInstance.close();
    };

    return (
        <div id="reportModal" className="modal" ref={reportModal} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <p></p>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close"
                            onClick={cancelModal}
                        />
                    </div>


                </div>
            </div>
        </div>

    );

}

export default ReportComponent;