import React, { Component } from 'react';

import './selection.css';

class Selection extends Component {
    
    info = () => {
        if (this.props.trackCount) {
            return (
                <div>
                    <h2>We found a total of</h2>
                    <h1>{this.props.trackCount}</h1>
                    <h2>songs in your library</h2>
                </div>
            );
        }
    }

    playlists = () => {
        if (this.props.trackCount) {
            const playlistNames = Object.keys(this.props.playlists)
            return playlistNames.map((playlist) => {
                return <p>{playlist}</p>
            });
        }
    }

    render() {
        return (
            <div className="selection-container">
                <div className="selection-heading">
                    <h1>Step 2</h1>
                </div>
                <div className="selection-text">
                    { this.info() }
                </div>
                <div className="selection-playlists">
                    { this.playlists() }
                </div>
            </div>
        );
    }
}

export default Selection;