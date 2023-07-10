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
        setReportClicked(true);

        const { selectedPostId } = props;

        try {
            const data = await fetchData(API_TO_REPORT_POST, "POST", { selectedPostId });

            // if (!data.error) {
            setShowReportBody(false);
            setReportPostSuccess(true);
            // }

        } catch (error) {
            console.log("Error:", error);
        }
    }

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
                                    <textarea className='report_desc' placeholder=' Enter your description'></textarea>
                                    <div className='mt-3'>
                                        <button onClick={reportPost} >Comment</button>
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