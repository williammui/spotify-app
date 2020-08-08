import React from "react";
import './step3.css';

const Step3Tracks = (props) => {
    const tracks = props.tracks;
    if (props.open) {
        return tracks.map((track) => {
            return (
                <div className="track-grid">
                    <div className="track-img" style={{
                        backgroundImage: `url(${track.imageURL})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}>
                    </div>
                    <div className="track-name">
                        <h4 className="text-name">{track.trackName}</h4>
                    </div>
                    <div className="track-artist">
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