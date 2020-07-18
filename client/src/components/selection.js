import React, { Component } from 'react';
import './selection.css';

import SelectionText from './selection-text';
import SelectionPlaylists from './selection-playlists';

class Selection extends Component {
    
    createPlaylist = (playlist) => {
        this.props.onClick(playlist);
    }

    render() {
        return (
            <div className="selection-container">
                <div className="selection-heading">
                    <h1>Step 2</h1>
                </div>
                <div className="selection-text">
                    <SelectionText 
                        step={this.props.step} 
                        trackCount={this.props.trackCount}
                        playlistType={this.props.playlistType} 
                        playlistCount={Object.keys(this.props.playlists).length} 
                    />
                </div>
                <div className="selection-playlists">
                    <SelectionPlaylists playlists={this.props.playlists} onClick={this.createPlaylist}/>
                </div>
            </div>
        );
    }
}

export default Selection;