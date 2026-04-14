import React from "react";

export default function LoaderComponent() {
    return (
        <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p>Loading...</p>
        </div>
    )
}