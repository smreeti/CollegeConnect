import React, { useEffect, useState } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI";
import { API_TO_FETCH_POST_REPORTS } from "../../utils/APIRequestUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faCheck, faTimes, faFlag } from "@fortawesome/free-solid-svg-icons";
import PostDetailComponent from "./PostDetailComponent.jsx";
import ReportActionModalComponent from "./ReportActionModalComponent.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportComponent = () => {
    const [activeTab, setActiveTab] = useState("postReports");
    const [postReports, setPostReports] = useState([]);
    const [isPostDetailOpen, setPostDetailOpen] = useState(false);
    const [isReportActionModalOpen, setReportActionModalOpen] = useState(false);
    const [action, setAction] = useState('');
    const [selectedPostId, setSelectedPostId] = useState('');
    const [userDetail, setUserDetail] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const POST_REPORTS = "postReports";
    const PROFILE_REPORTS = "profileReports";

    useEffect(() => {
        fetchPostReports();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);

        if (tab === POST_REPORTS) {
            fetchPostReports();
        }
    };

    const fetchPostReports = async () => {
        setIsLoading(true);

        try {
            const data = await fetchData(API_TO_FETCH_POST_REPORTS, "GET");
            setPostReports(data.body);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const openPostDetailModal = (postReport) => {
        setPostDetailOpen(true);
        setSelectedPostId(postReport.post);
        setUserDetail(postReport.reportedBy);
    }

    const handleApprove = async (reportId) => {
        setReportActionModalOpen(true);
        setAction('APPROVE');
        setSelectedPostId(reportId);
    };

    const handleReject = async (reportId) => {
        setReportActionModalOpen(true);
        setAction('REJECT');
        setSelectedPostId(reportId);
    };

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="report-container">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === POST_REPORTS ? "active" : ""}`}
                            onClick={() => handleTabClick(POST_REPORTS)}
                        >
                            Post Reports
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === PROFILE_REPORTS ? "active" : ""}`}
                            onClick={() => handleTabClick(PROFILE_REPORTS)}
                        >
                            Profile Reports
                        </button>
                    </li>
                </ul>

                {activeTab === POST_REPORTS && (
                    <div className="tab-content mt-2">
                        <div className="tab-pane active">
                            {isLoading ?
                                (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <p>Loading post reports...</p>
                                    </div>
                                ) :

                                (postReports.length > 0 ? (
                                    <div className="table-responsive reports-table">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "20%" }}>Reported By</th>
                                                    <th style={{ width: "20%" }}>Reported Date</th>
                                                    <th style={{ width: "40%" }}>Description</th>
                                                    <th style={{ width: "10%" }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {postReports.map((report) => (
                                                    <tr key={report._id}>
                                                        <td>
                                                            {`${report?.reportedBy?.firstName} ${report?.reportedBy?.lastName} 
                                                        (${report?.reportedBy?.username})`}
                                                        </td>
                                                        <td>{formatDate(report.reportedDate)}</td>
                                                        <td>{report.description}</td>
                                                        <td className="report_actions">
                                                            <FontAwesomeIcon
                                                                icon={faInfo}
                                                                className="icons modal-trigger"
                                                                onClick={() => openPostDetailModal(report)}
                                                                data-target="openUserPost"
                                                            />
                                                            <button
                                                                className="btn btn-success modal-trigger"
                                                                onClick={() => handleApprove(report._id)}
                                                                data-target="reportActionModal"
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </button>
                                                            <button
                                                                className="btn btn-danger modal-trigger"
                                                                onClick={() => handleReject(report._id)}
                                                                data-target="reportActionModal"
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) :
                                    (
                                        <div className="main-container" style={{ background: '#F5F5DC' }}>
                                            <div className="col-lg-6 col-12 p-2 px-md-5 py-md-4 card">
                                                <div className="text-center">
                                                    <p className='mt-md-5 mt-2'>
                                                        <FontAwesomeIcon icon={faFlag} size='3x' color='#008080' />

                                                    </p>
                                                    <h2 className="fs-2" style={{ color: '#008080' }}>
                                                        No Post Report(s) to review yet !
                                                    </h2>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                )}

                {activeTab === PROFILE_REPORTS && (
                    <div className="tab-pane active">
                        <p>Profile Reports tab content</p>
                    </div>
                )}

                {isPostDetailOpen &&
                    (<PostDetailComponent
                        selectedPostId={selectedPostId}
                        userDetail={userDetail}
                    />
                    )}

                {isReportActionModalOpen &&
                    (
                        <ReportActionModalComponent
                            selectedPostId={selectedPostId}
                            action={action}
                        />
                    )}
            </div>
        </>
    );
};

export default ReportComponent;
