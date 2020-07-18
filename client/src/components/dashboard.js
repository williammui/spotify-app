import React, { Component } from 'react';
import axios from 'axios';
import './dashboard.css';

import Classification from "./classification";
import Selection from "./selection";
import Playlists from "./playlists";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            track_count: 0,
            playlist_type: '',
            playlists: {},
            added_playlists: {}
        };
    }

    getPlaylists = (type) => {
        this.setState({
            step: 2,
            playlist_type: type
        });
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

    addPlaylist = (playlist) => {
        const added = this.state.added_playlists;
        added[playlist] = this.state.playlists[playlist];
        this.setState({
            step: 3,
            added_playlists: added
        });
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-navbar">
                    <h1>CLASSIFY</h1>
                </div>
                <div className="dashboard-container">
                    <div className="col">
                        <Classification onClick={this.getPlaylists} />
                    </div>
                    <div className="col">
                        <Selection
                            step={this.state.step} 
                            trackCount={this.state.track_count} 
                            playlistType={this.state.playlist_type} 
                            playlists={this.state.playlists} 
                            onClick={this.addPlaylist}
                        />
                    </div>
                    <div className="col">
                        <Playlists 
                            step={this.state.step}
                            addedPlaylists={this.state.added_playlists}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Dashboard;
