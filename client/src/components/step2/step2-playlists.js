import React from "react";

const Step2Playlists = (props) => {
    const playlists = props.playlists;
    if (playlists) {
        const playlistNames = Object.keys(playlists)
        return playlistNames.map((playlist) => {
            return (
                <div key={playlist}>
                    <button onClick={() => props.onClick(playlist)}>{playlist} ({playlists[playlist].length})</button>
                </div>
            )
        });
    }
};

export default Step2Playlists;