import React from "react";
import './playlists.css';

import PlaylistsItem from './playlists-item';

const PlaylistsAdded = (props) => {
    const addedPlaylists = props.addedPlaylists;
    if (addedPlaylists) {
        const playlistNames = Object.keys(addedPlaylists)
        return playlistNames.map((playlist) => {
            return (
                <PlaylistsItem name={playlist} tracks={addedPlaylists[playlist]}/>
            )
        });
    }
};

export default PlaylistsAdded;