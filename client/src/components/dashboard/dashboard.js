import React, { Component } from 'react';
import axios from 'axios';
import './dashboard.css';

import Navbar from './navbar';
import Step1 from "../step1/step1";
import Step2 from "../step2/step2";
import Step3 from "../step3/step3";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            saved: false,
            complete: false,
            track_count: 0,
            playlist_type: '',
            playlists: {},
            added_playlists: {},
            loading: false,
            user: ''
        };
    }

    componentDidMount() {
        this.reset();
        axios.get('http://localhost:5000/api/user/userInfo', { withCredentials: true })
                .then((res) => {
                    this.setState({
                        user: res.data
                    });
                })
                .catch((err) => {});
    }

    loginWithSpotify = () => {
        window.location.href='http://localhost:5000/api/auth/login';
    }

    getPlaylists = (type) => {
        this.setState({
            step: 2,
            playlist_type: type,
            loading: true
        });
        if (type === 'genre') {
            axios.get('http://localhost:5000/api/user/genre', { withCredentials: true })
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

    removePlaylist = (playlist) => {
        const added = this.state.added_playlists;
        delete added[playlist];
        this.setState({
            added_playlists: added
        });
        if (!Object.keys(added).length) {
            console.log('here');
            this.setState({
                step: 2
            });
        }
    } 

    savePlaylists = () => {
        this.setState({
            loading: true,
            complete: false,
            saved: false
        });
        axios.post('http://localhost:5000/api/user/save', this.state.added_playlists, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    saved: true,
                    loading: false,
                    complete: true
                });
            })
            .catch((err) => {
                this.setState({
                    saved: false,
                    loading: false,
                    complete: true
                });
            });
    }

    reset = () => {
        this.setState({
            step: 1,
            saved: false,
            complete: false,
            track_count: 0,
            playlist_type: '',
            playlists: {},
            added_playlists: {},
            loading: false
        });
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-navbar">
                    <Navbar user={this.state.user} login={this.loginWithSpotify} reset={this.reset} />
                </div>
                <div className="dashboard-container">
                    <div className="col">
                        <Step1 onClick={this.getPlaylists} user={this.state.user} />
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
                        <Step3 
                            step={this.state.step}
                            addedPlaylists={this.state.added_playlists}
                            onRemove={this.removePlaylist}
                            onSave={this.savePlaylists}
                            saved={this.state.saved}
                            loading={this.state.loading}
                            complete={this.state.complete}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
