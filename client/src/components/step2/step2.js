import React, { Component } from 'react';

import Step2Text from './step2-text';
import Step2Playlists from './step2-playlists';

class Step2 extends Component {
    
    createPlaylist = (playlist) => {
        this.props.onClick(playlist);
    }

    render() {
        let container = "step-container inactive"
        if (this.props.step >= 2) {
            container = "step-container"
        }
        return (
            <div className={container}>
                <h2 className="title step-heading"><span>Step 2</span></h2>
                <div className="step-description">
                    <Step2Text 
                        step={this.props.step} 
                        trackCount={this.props.trackCount}
                        playlistType={this.props.playlistType}
                        loading={this.props.loading}
                        playlistCount={Object.keys(this.props.playlists).length} 
                    />
                </div>
                <div className="overflow-container">
                    <Step2Playlists playlists={this.props.playlists} onClick={this.createPlaylist}/>
                </div>
            </div>
        );
    }
}

export default Step2;