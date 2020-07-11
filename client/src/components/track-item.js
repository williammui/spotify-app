import React, { Component } from 'react';

class TrackItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                <h2>{this.props.track.track.name}</h2>
            </div>
        );
    }
}

export default TrackItem;