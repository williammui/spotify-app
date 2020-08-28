import React from "react";
import './step3.css';

const Step3Saving = (props) => {
    if (!props.complete && !props.loading) {
        return <div></div>
    } else if (!props.complete && props.loading) {
        return <p className="text">Saving...</p>
    } else if (props.complete && !props.saved) {
        return <p className="text">Failed.</p>
    } else {
        return <p className="text">Saved.</p>
    }
};

export default Step3Saving;