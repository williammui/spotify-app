import React, { Component } from 'react';

import TrackItem from "./track-item";

class Tracks extends Component {

    constructor(props) {
        super(props);
    }

    tracks = () => {
        return this.props.tracks.map((track, index) => {
            return <TrackItem key={index} track={track} />
        })
    }

    render() {
        return (
            <div>
                <h3>Tracks</h3>
                <p>
                  { this.tracks() }
                </p>
            </div>
        );
    }
}

export default Tracks;