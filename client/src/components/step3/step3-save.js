import React from "react";
import './step3.css';

import Step3Saving from './step3-saving';

const Step3Save = (props) => {
    if (props.step < 3) {
        return <div></div>
    } else {
        return (
            <div className="flex-container">
                <button onClick={props.onSave} className="save-btn">SAVE TO<br></br>SPOTIFY</button>
                <div style={{marginLeft: "auto"}}>
                    <Step3Saving loading={props.loading} saved={props.saved} complete={props.complete} />
                </div>
            </div>
        )
    } 
};

export default Step3Save;