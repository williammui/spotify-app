import React, { Component } from 'react';
import axios from 'axios';

import Classification from "./classification";
import Selection from "./selection";
import Playlists from "./playlists";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            track_count: 0,
            playlist_type: '',
            playlists: {},
            selected_playlists: {}
        };
    }

    getPlaylists = (type) => {
        this.setState({playlist_type: type});
        if (type === 'genre') {
            axios.get('http://localhost:5000/genre')
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        track_count: res.data.track_count,
                        playlist_type: type,
                        playlists: res.data.playlists
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div>
                <Classification onClick={this.getPlaylists} />
                <Selection 
                    trackCount={this.state.track_count} 
                    playlistType={this.state.playlist_type} 
                    playlists={this.state.playlists} 
                />
                <Playlists />
            </div>
        )
    }
}

export default Dashboard;
