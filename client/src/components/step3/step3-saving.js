import React from "react";
import './step3.css';

const Step3Saving = (props) => {
    if (!props.complete && !props.loading) {
        return <div></div>
    } else if (!props.complete && props.loading) {
        return <div className="text">Saving</div>
    } else if (props.complete && !props.saved) {
        return <div className="text">Failed.</div>
    } else {
        return <div className="text">Saved.</div>
    }
};

export default Step3Saving;