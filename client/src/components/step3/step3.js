import React, { Component } from 'react';
import './step3.css';

import Step3Text from './step3-text';
import Step3Playlists from './step3-playlists';
import Step3Save from './step3-save';

class Step3 extends Component {

    onRemove = (playlist) => {
        this.props.onRemove(playlist);
    }

    onSave = () => {
        this.props.onSave();
    }

    render() {
        let container = "step-container inactive"
        if (this.props.step === 3) {
            container = "step-container"
        }
        return (
            <div className={container}>
                <h2 className="title step-heading"><span>Step 3</span></h2>
                <div className="step-description">
                    <Step3Text 
                        step={this.props.step} 
                    />
                </div>
                <div className="overflow-container step-heading">
                    <Step3Playlists 
                        step={this.props.step}
                        addedPlaylists={this.props.addedPlaylists}
                        onRemove={this.onRemove}
                    />
                </div>
                <Step3Save
                    step={this.props.step} 
                    onSave={this.onSave}
                    saved={this.props.saved}
                    loading={this.props.loading} 
                    complete={this.props.complete}
                />
            </div>
        );
    }
}

export default Step3;