import React, { Component } from 'react';
import './playlists.css';

import PlaylistsTracks from './playlists-tracks';

class PlaylistsItem extends Component {

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
                <button onClick={() => this.toggle()}>{this.props.name}</button>
                <PlaylistsTracks 
                    open={this.state.open}
                    name={this.props.name} 
                    tracks={this.props.tracks}
                />
            </div>
            
        );
    }
}

export default PlaylistsItem;