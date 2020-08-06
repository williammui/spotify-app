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
                <h2 className="title step-heading"><span>Step 3</span></h2>
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