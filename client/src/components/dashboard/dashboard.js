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
            user: '',
            error: false
        };
    }

    componentDidMount() {
        this.reset();
        axios.get('/api/user/userInfo', { withCredentials: true })
                .then((res) => {
                    this.setState({
                        user: res.data
                    });
                })
                .catch((err) => {});
    }

    loginWithSpotify = () => {
        axios.get('/api/auth/login', { withCredentials: true })
                .then((res) => {
                  window.location.href = res.data;
                })
                .catch((err) => {});
    }

    getPlaylists = (type) => {
        this.setState({
            step: 2,
            playlist_type: type,
            loading: true,
            track_count: 0,
            playlists: {},
            added_playlists: {},
            saved: false,
            complete: false,
        });
        if (type === 'genre') {
            axios.get('/api/user/genre', { withCredentials: true })
                .then((res) => {
                    if (this.state.step === 2) {
                        this.setState({
                            track_count: res.data.track_count,
                            playlist_type: type,
                            playlists: res.data.playlists,
                            loading: false
                        });
                    }
                })
                .catch((err) => {
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
            this.setState({
                step: 2,
                complete: false
            });
        }
    } 

    savePlaylists = () => {
        this.setState({
            loading: true,
            complete: false,
            saved: false
        });
        axios.post('/api/user/save', this.state.added_playlists, { withCredentials: true })
            .then((res) => {
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
                            error={this.state.error}
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
