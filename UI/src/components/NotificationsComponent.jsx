import React, { useEffect, useState } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI";
import { API_TO_FETCH_NOTIFICATIONS } from "../../utils/APIRequestUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import LoaderComponent from "./LoaderComponent.jsx";
import PostDetailComponent from "./PostDetailComponent.jsx";

const NotificationsComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [selectedPostId, setSelectedPostId] = useState('');
    const [userDetail, setUserDetail] = useState('');
    const [isPostDetailModalOpen, setPostDetailOpen] = useState(false);

    useEffect(() => {
        fetchUserNotifications();
    }, []);

    const fetchUserNotifications = async () => {
        setIsLoading(true);

        try {
            const data = await fetchData(API_TO_FETCH_NOTIFICATIONS, "GET");
            setNotifications(data.body);
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

    const openPostDetailModal = (notifications) => {
        if (notifications?.post) {
            setPostDetailOpen(true);
            setSelectedPostId(notifications?.post);
            setUserDetail(notifications?.post?.postedBy);
        }
    }

    return (
        <>
            <Header />

            {isLoading ?
                (
                    <LoaderComponent />
                ) :

                (notifications.length > 0 ? (
                    <div className="report-container">
                        <div className="table-responsive reports-table">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Subject</th>
                                        <th style={{ width: "20%" }}>Notification Date</th>
                                        <th style={{ width: "40%" }}>Remarks</th>
                                        <th style={{ width: "10%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notifications.map((notification) => (
                                        <tr key={notification._id}>
                                            <td>{notification.subject}</td>
                                            <td>{formatDate(notification.notificationDate)}</td>
                                            <td>{notification.remarks}</td>

                                            <td className="notification_actions">
                                                <FontAwesomeIcon
                                                    icon={faInfo}
                                                    className="icons modal-trigger"
                                                    onClick={() => openPostDetailModal(notification)}
                                                    data-target="openUserPost"
                                                />

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) :
                    (
                        <div className="main-container" style={{ background: '#F5F5DC' }}>
                            <div className="col-lg-6 col-12 p-2 px-md-5 py-md-4 card">
                                <div className="text-center">
                                    <p className='mt-md-5 mt-2'>
                                        <FontAwesomeIcon icon={faBellSlash} size='3x' color='#008080' />

                                    </p>
                                    <h2 className="fs-2" style={{ color: '#008080' }}>
                                        No new Notification(s)!
                                    </h2>
                                </div>

                            </div>
                        </div>
                    )
                )
            }

            {isPostDetailModalOpen &&
                (<PostDetailComponent
                    selectedPostId={selectedPostId}
                    userDetail={userDetail}
                    isNotificationDetail={true}
                />
                )}
        </>
    );
};

export default NotificationsComponent;
