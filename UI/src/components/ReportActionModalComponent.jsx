import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_TO_APPROVE_POST_REPORTS, API_TO_REJECT_POST_REPORTS, API_TO_REPORT_POST } from "../../utils/APIRequestUrl";
import fetchData from "../../utils/FetchAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportActionModalComponent = (props) => {
    const reportModal = useRef(null);

    const [remarks, setRemarks] = useState('');
    const [errors, setErrors] = useState('');
    const { selectedPostId, action } = props;

    useEffect(() => {
        M.Modal.init(reportModal.current);
    }, [props]);

    const cancelModal = () => {
        const modalInstance = M.Modal.getInstance(reportModal.current);
        modalInstance.close();
        setRemarks('');
    };

    const confirmAction = async () => {

        let formErrors = handleReportPostForm();
        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
        } else {
            const reportData = {
                postReportsId: selectedPostId,
                remarks
            };

            if (action == "APPROVE") {
                const data = await fetchData(API_TO_APPROVE_POST_REPORTS, "POST", reportData);

                if (!data.error)
                    toast.success("Post report approved successfully!");

            } else if (action == "REJECT") {
                const data = await fetchData(API_TO_REJECT_POST_REPORTS, "POST", reportData);

                if (!data.error)
                    toast.error("Post report rejected successfully!");
            }

            cancelModal();
            window.location.reload();
        }
    }

    const handleReportPostForm = () => {
        let formErrors = {};
        if (!remarks)
            formErrors["description"] = "Please provide remarks";

        return formErrors;
    }

    const handleOnChange = (event) => {
        const { value } = event.target;
        setRemarks(value);
    };

    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
    };

    return (
        <>
            <ToastContainer />
            <div id="reportActionModal" className="modal" ref={reportModal} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Confirm {action} ?</h4>
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="close"
                                onClick={cancelModal}
                            />
                        </div>

                        <div className="modal-body">
                            <textarea
                                value={remarks}
                                onChange={handleOnChange}
                                className="report_desc"
                                name="remarks"
                                placeholder=' Enter your remarks'
                            ></textarea>
                            <p className="required errormsg errpad1">
                                {errors["remarks"]}
                            </p>

                            <div className='mt-3'>
                                <button onClick={confirmAction}>Confirm</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportActionModalComponent;