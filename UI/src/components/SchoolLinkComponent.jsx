import React from "react";
import { Link } from "react-router-dom";

const SchoolLink = ({ schoolName, imageSrc, onClick, to }) => {
    return (
        <Link onClick={onClick} to={to}>
            <div className="card">
                <img className="card-img-top" src={imageSrc} alt="" />
                <div className="card-body">
                    <h1 className="card-title text-center">{schoolName}</h1>
                </div>
            </div>
        </Link>
    );
};

export default SchoolLink;