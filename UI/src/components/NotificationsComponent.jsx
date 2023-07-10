import React, { useEffect, useState } from "react";
import Header from "../Header.jsx";
import fetchData from "../../utils/FetchAPI";
import { API_TO_FETCH_NOTIFICATIONS } from "../../utils/APIRequestUrl.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import LoaderComponent from "./LoaderComponent.jsx";

const NotificationsComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState('');

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

    return (
        <>
            <Header />
            <div className="mt-5">

                {isLoading ?
                    (
                        <LoaderComponent />
                    ) :

                    (notifications.length > 0 ? (
                        <div className="table-responsive notifications-table">
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
                                                    // onClick={() => openPostDetailModal(notification)}
                                                    data-target="openUserPost"
                                                />

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) :
                        (
                            <h2>
                                <p className="no-notifications-message text-center">No Notification(s) yet!</p>
                            </h2>
                        )
                    )
                }
            </div>
        </>
    );
};

export default NotificationsComponent;
