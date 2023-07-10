import React, { useState } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI";
import { API_TO_FETCH_POST_REPORTS } from "../../utils/APIRequestUrl.js";

const ReportComponent = () => {
    const [activeTab, setActiveTab] = useState("postReports");
    const [postReports, setPostReports] = useState([]);

    const POST_REPORTS = "postReports";
    const PROFILE_REPORTS = "profileReports";

    const handleTabClick = (tab) => {
        setActiveTab(tab);

        if (tab == POST_REPORTS) {
            const postReports = fetchData(API_TO_FETCH_POST_REPORTS, "");
            setPostReports(postReports);
        }
    };

    return (
        <>
            <Header />
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
                            <p>Reports tab content</p>
                        </div>
                    )}

                    {activeTab === PROFILE_REPORTS && (
                        <div className="tab-pane active">
                            <p>History tab content</p>
                        </div>
                    )}
                    {/* Add more tab content as needed */}
                </div>
            </div>
        </>
    );
};

export default ReportComponent;
