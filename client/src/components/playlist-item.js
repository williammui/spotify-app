import React, { Component } from 'react';
import axios from 'axios';

class PlaylistItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                <h6>{this.props.playlist.name}</h6>
                <img src={this.props.playlist.images[0].url} alt="image"/>
            </div>
        );
    }
}

export default PlaylistItem;