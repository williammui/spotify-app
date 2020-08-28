import React from "react";
import './step3.css';

const Step3Tracks = (props) => {
    const tracks = props.tracks;
    if (props.open) {
        return tracks.map((track) => {
            return (
                <div className="track-container" key={track.trackID}>
                    <img src={track.imageURL} alt="track cover"/>
                    <div className="track-details">
                        <h4 className="text-name">{track.trackName}</h4>
                        <h4 className="text-artist">{track.artistName[0]}</h4>
                    </div>
                </div>
            );
        })
    } else {
        return (
            <div></div>
        )
    }
};

export default Step3Tracks;