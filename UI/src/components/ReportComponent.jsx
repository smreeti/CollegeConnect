import React, { useEffect, useState } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI";
import { API_TO_FETCH_COMMENT_REPORTS, API_TO_FETCH_POST_REPORTS } from "../../utils/APIRequestUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faCheck, faTimes, faFlag } from "@fortawesome/free-solid-svg-icons";
import PostDetailComponent from "./PostDetailComponent.jsx";
import ReportActionModalComponent from "./ReportActionModalComponent.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportCommentActionModalComponent from "./ReportCommentActionModalComponent.jsx";
import PostReportDetailComponent from "./PostReportDetailComponent.jsx";

const ReportComponent = () => {
    const [activeTab, setActiveTab] = useState("postReports");
    const [postReports, setPostReports] = useState([]);
    const [commentReports, setCommentReports] = useState([]);

    const [isPostDetailOpen, setPostDetailOpen] = useState(false);
    const [isReportActionModalOpen, setReportActionModalOpen] = useState(false);
    const [action, setAction] = useState('');
    const [selectedPostId, setSelectedPostId] = useState('');

    const [isCommentReportActionModalOpen, setCommentReportActionModalOpen] = useState(false);
    const [selectedCommentReportId, setSelectedCommentReportId] = useState('');

    const [isPostReportDetailOpen, setPostReportDetailOpen] = useState(false);
    const [reportedComment, setReportedComment] = useState([]);

    const [userDetail, setUserDetail] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const POST_REPORTS = "postReports";
    const PROFILE_REPORTS = "profileReports";
    const COMMENT_REPORTS = "commentReports";

    useEffect(() => {
        fetchPostReports();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);

        if (tab === POST_REPORTS) {
            fetchPostReports();
        } else if (tab === COMMENT_REPORTS) {
            fetchCommentReports();
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

    const fetchCommentReports = async () => {
        setIsLoading(true);

        try {
            const data = await fetchData(API_TO_FETCH_COMMENT_REPORTS, "GET");
            setCommentReports(data.body);
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

    const handleCommentReportApprove = async (reportId) => {
        setCommentReportActionModalOpen(true);
        setAction('APPROVE');
        setSelectedCommentReportId(reportId);
    };

    const handleCommentReportReject = async (reportId) => {
        setCommentReportActionModalOpen(true);
        setAction('REJECT');
        setSelectedCommentReportId(reportId);
    };

    const openPostReportDetailModal = (postReport) => {
        setPostReportDetailOpen(true);
        setSelectedPostId(postReport.postComment.post);
        setUserDetail(postReport.postedBy);
        setReportedComment(postReport.postComment);
    }

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
                            className={`nav-link ${activeTab === COMMENT_REPORTS ? "active" : ""}`}
                            onClick={() => handleTabClick(COMMENT_REPORTS)}
                        >
                            Comment Reports
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

                {activeTab === COMMENT_REPORTS && (
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

                                (commentReports.length > 0 ? (
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
                                                {commentReports.map((report) => (
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
                                                                onClick={() => openPostReportDetailModal(report)}
                                                                data-target="openUserPost"
                                                            />
                                                            <button
                                                                className="btn btn-success modal-trigger"
                                                                onClick={() => handleCommentReportApprove(report._id)}
                                                                data-target="reportActionModal"
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </button>
                                                            <button
                                                                className="btn btn-danger modal-trigger"
                                                                onClick={() => handleCommentReportReject(report._id)}
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
                                                        No Comment Report(s) to review yet !
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

                {isCommentReportActionModalOpen &&
                    (
                        <ReportCommentActionModalComponent
                            selectedCommentReportId={selectedCommentReportId}
                            action={action}
                        />
                    )}

                {isPostReportDetailOpen &&
                    (<PostReportDetailComponent
                        selectedPost={selectedPostId}
                        userDetail={userDetail}
                        postComment = {reportedComment}
                    />
                    )}
            </div>
        </>
    );
};

export default ReportComponent;
