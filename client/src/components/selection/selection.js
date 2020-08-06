import React, { Component } from 'react';
import './selection.css';

import SelectionText from './selection-text';
import SelectionPlaylists from './selection-playlists';

class Selection extends Component {
    
    createPlaylist = (playlist) => {
        this.props.onClick(playlist);
    }

    render() {
        let container = "selection-container"
        if (this.props.step >= 2) {
            container += " selection-active"
        }
        return (
            <div className={container}>
                <h2 className="title step-heading"><span>Step 2</span></h2>
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