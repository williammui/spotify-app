import React, { Component } from 'react';
import './playlists.css';

import PlaylistsText from './playlists-text';
import PlaylistsAdded from './playlists-added';

class Playlists extends Component {

    onSave = () => {
        this.props.onSave();
    }

    render() {
        let container = "playlists-container";
        if (this.props.step == 3) {
            container += " playlists-active";
        }
        return (
            <div className={container}>
                <div className="playlists-heading">
                    <h1>Step 3</h1>
                </div>
                <div className="playlists-text">
                </div>
                <div className="playlists-saved">
                    <PlaylistsAdded addedPlaylists={this.props.addedPlaylists} />
                </div>
                <button onClick={() => this.onSave()}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlists;