import React from "react";
import './playlists.css';

const PlaylistsTracks = (props) => {
    const tracks = props.tracks;
    if (props.open) {
        return tracks.map((track) => {
            return (
                <div>
                    <p>{track.trackName}</p>
                    <p>{track.artistName[0]}</p>
                    <img src={track.imageURL} alt="image"/>
                </div>
            );
        })
    } else {
        return (
            <div></div>
        )
    }
};

export default PlaylistsTracks;