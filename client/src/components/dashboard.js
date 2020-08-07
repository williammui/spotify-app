import React, { Component } from 'react';
import axios from 'axios';
import './dashboard.css';

import Step1 from "./step1/step1";
import Step2 from "./step2/step2";
import Playlists from "./playlists/playlists";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            complete: false,
            track_count: 0,
            playlist_type: '',
            playlists: {},
            added_playlists: {},
            loading: false
        };
    }

    getPlaylists = (type) => {
        this.setState({
            step: 2,
            playlist_type: type,
            loading: true
        });
        if (type === 'genre') {
            axios.get('http://localhost:5000/genre')
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        track_count: res.data.track_count,
                        playlist_type: type,
                        playlists: res.data.playlists,
                        loading: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        error: true
                    });
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

    savePlaylists = () => {
        console.log(this.state.added_playlists);
        axios.post('http://localhost:5000/save', this.state.added_playlists)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    complete: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-navbar">
                    <h1 className="subtitle-med">CLASSIFY</h1>
                </div>
                <div className="dashboard-container">
                    <div className="col">
                        <Step1 onClick={this.getPlaylists} />
                    </div>
                    <div className="col">
                        <Step2
                            step={this.state.step} 
                            trackCount={this.state.track_count} 
                            playlistType={this.state.playlist_type} 
                            playlists={this.state.playlists}
                            loading={this.state.loading}
                            onClick={this.addPlaylist}
                        />
                    </div>
                    <div className="col">
                        <Playlists 
                            step={this.state.step}
                            addedPlaylists={this.state.added_playlists}
                            onSave={this.savePlaylists}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
