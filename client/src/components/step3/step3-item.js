import React, { Component } from 'react';
import './step3.css';

import Step3Tracks from './step3-tracks';

class Step3Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div>
                <div className="flex-container">
                    <button onClick={() => this.toggle()}>{this.props.name} ({this.props.length})</button>
                    <button onClick={() => this.props.onRemove(this.props.name)} className="remove-btn">x</button>
                </div>
                <Step3Tracks 
                    open={this.state.open}
                    tracks={this.props.tracks}
                />
            </div>
            
        );
    }
}

export default Step3Item;