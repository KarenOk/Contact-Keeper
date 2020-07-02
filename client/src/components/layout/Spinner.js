import React from 'react';
import spinner from "./spinner.gif";

function Spinner() {
    return (
        <div className="my-3 py-3">
            <img
                src={spinner}
                alt="Loading..."
                style={{ width: "150px", display: "block", margin: "auto" }}
            />
        </div>
    );
}

export default Spinner;
