import React, { Component } from 'react';
import axios from 'axios';

import PlaylistItem from "./playlist-item";

class Playlists extends Component {

    constructor(props) {
        super(props);
    }

    selectPlaylistItem = (index) => {
      console.log(index);
      this.props.selectPlaylist(index);
    }

    playlists = () => {
        console.log('received prop');
        return this.props.playlists.map((playlist, index) => {
            return <PlaylistItem key={index} playlist={playlist} onClick={() => this.selectPlaylistItem(index)}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Select Playlist</h3>
                <p>
                  { this.playlists() }
                </p>
            </div>
        );
    }
}

export default Playlists;