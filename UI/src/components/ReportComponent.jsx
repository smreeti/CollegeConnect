import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_TO_REPORT_POST } from "../../utils/APIRequestUrl";
import fetchData from "../../utils/FetchAPI";

const ReportComponent = (props) => {
    const reportModal = useRef(null);
    const [showReportBody, setShowReportBody] = useState(false);
    const [isReportClicked, setReportClicked] = useState(false);
    const [isReportPostSuccess, setReportPostSuccess] = useState(false);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        M.Modal.init(reportModal.current);
    }, [props]);

    const cancelModal = () => {
        const modalInstance = M.Modal.getInstance(reportModal.current);
        modalInstance.close();
    };

    const handleReportPost = (event) => {
        event.preventDefault();
        setShowReportBody(true);
    }

    const goBack = (event) => {
        event.preventDefault();
        setShowReportBody(false);
    }

    const reportPost = async () => {
        const { selectedPostId } = props;
        setReportClicked(true);

        let formErrors = handleReportPostForm();
        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
        } else {
            const reportData = {
                selectedPostId,
                description
            };

            const data = await fetchData(API_TO_REPORT_POST, "POST", reportData);
            if (!data.error) {
                setShowReportBody(false);
                setReportPostSuccess(true);
            }
        }
    }

    const handleReportPostForm = () => {
        let formErrors = {};
        if (!description)
            formErrors["description"] = "Please provide description";

        return formErrors;
    }

    const handleOnChange = (event) => {
        const { value } = event.target;
        setDescription(value);
    };

    const setFormErrors = (formErrors) => {
        setErrors(formErrors);
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

                    <div className="modal-body">
                        {
                            showReportBody ? (
                                <>
                                    <textarea
                                        value={description}
                                        onChange={handleOnChange}
                                        className="report_desc"
                                        name="description"
                                        placeholder=' Enter your description'
                                    ></textarea>
                                    <p className="required errormsg errpad1">
                                        {errors["description"]}
                                    </p>

                                    <div className='mt-3'>
                                        <button onClick={reportPost}>Report</button>
                                        <Link onClick={goBack} style={{ marginLeft: '10px' }}>Go Back</Link>
                                    </div>
                                </>
                            ) :
                                !isReportClicked && <Link onClick={handleReportPost}>Report</Link>
                        }

                        {isReportPostSuccess &&
                            <>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="success-check"
                                />
                                <b><p className="text-center">Thanks for reporting this ad </p></b>
                                <p>We will review this post to determine whether it violates our Policies. Thanks for helping us keep CollegeConnect safe.</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportComponent;