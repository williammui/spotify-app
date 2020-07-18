import React from "react";
import './selection.css';

const SelectionPlaylists = (props) => {
    const playlists = props.playlists;
    if (playlists) {
        const playlistNames = Object.keys(props.playlists)
        return playlistNames.map((playlist) => {
            return (
                <div>
                    <button onClick={() => props.onClick(playlist)}>{playlist}</button>
                    <p>{playlists[playlist].length}</p>
                </div>
            )
        });
    }
};

export default SelectionPlaylists;