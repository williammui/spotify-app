import React from "react";

const Step3Text = (props) => {
    if (props.step < 3) {
        return <div></div>
    } else {
        return <h3 className="text">Click a playlist to preview its tracks.</h3>
    } 
};

export default Step3Text;