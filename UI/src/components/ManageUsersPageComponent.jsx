import React, { useEffect, useRef, useState } from "react";
import Header from "../Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SchoolLinkComponent from "./SchoolLinkComponent.jsx";


const ManageUsersPageComponent = () => {
    const [isSchool, setSchool] = useState("");

    const handleClick = (school) => {
        setSchool(school);
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="container h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '93.2vh' }}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-sm-4">
                        <SchoolLinkComponent
                            schoolName="Conestoga College"
                            imageSrc="/assets/group.jpg"
                            onClick={() => handleClick("Conestoga College")}
                            to={`/${isSchool}/users-list`}
                        />
                    </div>
                    <div className="col-sm-4">
                        <SchoolLinkComponent
                            schoolName="Humber College"
                            imageSrc="/assets/graduate.jpg"
                            onClick={() => handleClick("Humber College")}
                            to={`/${isSchool}/users-list`}
                        />
                    </div>

                </div>
            </div >
        </>
    );

};

export default ManageUsersPageComponent;
