import React, { useEffect, useState, forwardRef } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI.js";
import {
    API_TO_FETCH_SUPERADMIN_LIST, API_TO_FETCH_REGULAR_USER_LIST
} from "../../utils/APIRequestUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetailComponent from "./UserDetailComponent.jsx";
import { Link, useParams } from "react-router-dom";

const UsersListComponent = () => {
    const [activeTab, setActiveTab] = useState("adminList");
    const [adminListView, setAdminListView] = useState([]);
    const [regularListView, setRegularListView] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [isUserDetailOpen, setUserDetailOpen] = useState(false);
    const [isSelectedUserId, setSelectedUserId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { schoolName } = useParams();

    const ADMIN_LIST = "adminList";
    const REGULAR_USER_LIST = "regulatUserList";

    useEffect(() => {
        if (schoolName === "Humber College") {
            fetchAdminUserList("Humber College");
            fetchRegularUserList("Humber College");
        } else if (schoolName === "Conestoga College") {
            fetchAdminUserList("Conestoga College");
            fetchRegularUserList("Conestoga College");
        }
    }, [schoolName]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === ADMIN_LIST) {
            fetchAdminUserList(schoolName);
        } else if (tab === REGULAR_USER_LIST) {
            fetchRegularUserList(schoolName);
        }
        setSearchQuery('');
    };

    const fetchAdminUserList = async (schoolName) => {
        setIsLoading(true);

        try {
            const url = `${API_TO_FETCH_SUPERADMIN_LIST}?school=${schoolName}`;
            const data = await fetchData(url, "GET");
            setAdminListView(data.body);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRegularUserList = async (schoolName) => {
        setIsLoading(true);

        try {
            const url = `${API_TO_FETCH_REGULAR_USER_LIST}?school=${schoolName}`;
            const data = await fetchData(url, "GET");
            setRegularListView(data.body);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (users) => {

        return users.filter((user) => {
            const fullName = `${user?.firstName} ${user?.lastName}`;
            const email = `${user?.email}`;
            const mobileNumber = `${user?.mobileNumber}`;
            const status = `${user?.status}`;

            return (
                fullName.toLowerCase().includes(searchQuery.toLowerCase()) || email.toLowerCase().includes(searchQuery.toLowerCase()) || mobileNumber.includes(searchQuery) || status.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    };

    const openUserDetailModal = (selectedUser) => {
        console.log(selectedUser, "is");
        setUserDetailOpen(true);
        setSelectedUserId(selectedUser);
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="report-container pt-5">
                <ul className="nav nav-tabs pt-2">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === ADMIN_LIST ? "active" : ""}`}
                            onClick={() => handleTabClick(ADMIN_LIST)}
                        >
                            Admins
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === REGULAR_USER_LIST ? "active" : ""}`}
                            onClick={() => handleTabClick(REGULAR_USER_LIST)}
                        >
                            Regular Users
                        </button>
                    </li>
                </ul>

                {activeTab === ADMIN_LIST && (
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

                                (adminListView?.length > 0 ? (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control search-filter"
                                            placeholder="Search by name, email, username, phone number or status"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="table-responsive reports-table">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "20%" }}>Name</th>
                                                        <th style={{ width: "20%" }}>Email</th>
                                                        <th style={{ width: "13%" }}>Mobile Number</th>
                                                        <th style={{ width: "12%" }}>School</th>
                                                        <th style={{ width: "10%" }}>Status</th>
                                                        <th style={{ width: "5%" }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {handleSearch(adminListView).map((admin) => (
                                                        <tr key={admin._id}>
                                                            <td>
                                                                {`${admin?.firstName} ${admin?.lastName} 
                                                    (${admin?.username})`}
                                                            </td>
                                                            <td>{admin?.email}</td>
                                                            <td>{admin?.mobileNumber}</td>
                                                            <td>{schoolName}</td>
                                                            <td style={{ color: admin?.status === 'ACTIVE' ? 'green' : 'red' }}>
                                                                {admin?.status}
                                                            </td>

                                                            <td className="report_actions">
                                                                <Link to={`/${schoolName}/${admin._id}/details`}>
                                                                    <FontAwesomeIcon
                                                                        icon={faInfoCircle}
                                                                    />
                                                                </Link>
                                                                <button
                                                                    className="btn btn-success modal-trigger"
                                                                    onClick={() => handleApprove(admin._id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger modal-trigger"
                                                                    onClick={() => handleReject(admin._id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                ) :
                                    (
                                        <div className="main-container" style={{ background: '#F5F5DC', minHeight: "80vh !important" }}>
                                            <div className="col-lg-6 col-12 p-2 px-md-5 py-md-4 card">
                                                <div className="text-center">
                                                    <p className='mt-md-5 mt-2'>
                                                        {/* <FontAwesomeIcon icon={faFlag} size='3x' color='#008080' /> */}

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

                {activeTab === REGULAR_USER_LIST && (
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

                                (regularListView?.length > 0 ? (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control search-filter"
                                            placeholder="Search by name, email, username, phone number or status"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="table-responsive reports-table">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "20%" }}>Name</th>
                                                        <th style={{ width: "20%" }}>Email</th>
                                                        <th style={{ width: "13%" }}>Mobile Number</th>
                                                        <th style={{ width: "12%" }}>School</th>
                                                        <th style={{ width: "10%" }}>Status</th>
                                                        <th style={{ width: "5%" }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {handleSearch(regularListView)?.map((regular) => (
                                                        <tr key={regular._id}>
                                                            <td>
                                                                {`${regular?.firstName} ${regular?.lastName} 
                                                (${regular?.username})`}
                                                            </td>
                                                            <td>{regular?.email}</td>
                                                            <td>{regular?.mobileNumber}</td>
                                                            <td>{schoolName}</td>
                                                            <td style={{ color: regular?.status === 'ACTIVE' ? 'green' : 'red' }}>
                                                                {regular?.status}
                                                            </td>
                                                            <td className="report_actions">
                                                                <Link to={`/${schoolName}/${regular._id}/details`}>
                                                                    <FontAwesomeIcon
                                                                        icon={faInfoCircle}
                                                                        className="icons modal-trigger"
                                                                        data-target="openUserPost"
                                                                    />
                                                                </Link>
                                                                <button
                                                                    className="btn btn-success modal-trigger"
                                                                    onClick={() => handleCommentReportApprove(regular._id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger modal-trigger"
                                                                    onClick={() => handleCommentReportReject(regular._id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                ) :
                                    (
                                        <div className="main-container" style={{ background: '#F5F5DC', minHeight: "80vh !important" }}>
                                            <div className="col-lg-6 col-12 p-2 px-md-5 py-md-4 card">
                                                <div className="text-center">
                                                    <p className='mt-md-5 mt-2'>
                                                        {/* <FontAwesomeIcon icon={faFlag} size='3x' color='#008080' /> */}

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

            </div>
            {isUserDetailOpen &&
                (<UserDetailComponent
                    selectedUser={isSelectedUserId}
                    schoolName={schoolName}
                />
                )}
        </>
    );
};

export default forwardRef(UsersListComponent);
