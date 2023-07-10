import React, { useEffect, useState } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI";
import { API_TO_APPROVE_POST_REPORTS, API_TO_FETCH_POST_REPORTS, API_TO_REJECT_POST_REPORTS } from "../../utils/APIRequestUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import PostDetailComponent from "./PostDetailComponent.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportComponent = () => {
    const [activeTab, setActiveTab] = useState("postReports");
    const [postReports, setPostReports] = useState([]);
    const [isPostDetailOpen, setPostDetailOpen] = useState(false);
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
        try {
            const data = await fetchData(API_TO_APPROVE_POST_REPORTS, "POST", {
                postReportsId: reportId
            });

            if (!data.error) {
                fetchPostReports();
                toast.success("Post report approved successfully!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleReject = async (reportId) => {
        try {
            const data = await fetchData(API_TO_REJECT_POST_REPORTS, "POST", {
                postReportsId: reportId
            });

            if (!data.error) {
                fetchPostReports();
                toast.error("Post report rejected successfully!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="mt-5">
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

                <div className="tab-content mt-3">
                    {activeTab === POST_REPORTS && (
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
                                                                className="btn btn-success"
                                                                onClick={() => handleApprove(report._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </button>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleReject(report._id)}
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
                                        <h2>
                                            <p className="no-reports-message text-center">No Post Report(s) to review yet!</p>
                                        </h2>
                                    )
                                )
                            }
                        </div>
                    )}

                    {activeTab === PROFILE_REPORTS && (
                        <div className="tab-pane active">
                            <p>Profile Reports tab content</p>
                        </div>
                    )}
                </div>

                {isPostDetailOpen &&
                    (<PostDetailComponent
                        selectedPostId={selectedPostId}
                        userDetail={userDetail}
                    />
                    )}
            </div>
        </>
    );
};

export default ReportComponent;
