import React from "react";
import Step3Item from "./step3-item";

const Step3Playlists = (props) => {
    const addedPlaylists = props.addedPlaylists;
    if (addedPlaylists) {
        const playlistNames = Object.keys(addedPlaylists)
        return playlistNames.map((playlist) => {
            return (
                <div key={playlist}>
                    <Step3Item name={playlist} length={addedPlaylists[playlist].length} tracks={addedPlaylists[playlist]} onRemove={props.onRemove}/>
                </div>
            )
        });
    }
};

export default Step3Playlists;