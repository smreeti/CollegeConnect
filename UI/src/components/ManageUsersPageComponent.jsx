import React, { useEffect, useRef, useState } from "react";
import Header from "../Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SchoolLinkComponent from "./SchoolLinkComponent.jsx";
import { API_TO_FETCH_COLLEGE_INFO } from "../../utils/APIRequestUrl.js";
import fetchData from "../../utils/FetchAPI.js";


const ManageUsersPageComponent = () => {
    const [isSchool, setSchool] = useState([]);

    useEffect(() => {
        schoolListName();
    }, [])



    const schoolListName = async () => {
        try {
            const data = await fetchData(API_TO_FETCH_COLLEGE_INFO, "GET");
            setSchool(data.body);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="container h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '93.2vh' }}>
                <div className="d-flex justify-content-between">
                    {isSchool && isSchool.length > 0 && (
                        isSchool.map((school) => (
                            <div className="col-sm-5">
                                <SchoolLinkComponent
                                    schoolName={school.name}
                                    // imageSrc="/assets/group.jpg"
                                    onClick={schoolListName}
                                    to={`/${school.name}/users-list`}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div >
        </>
    );

};

export default ManageUsersPageComponent;
