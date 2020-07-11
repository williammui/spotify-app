import React, { Component } from 'react';
import axios from 'axios';

import Playlists from "./playlists";
import Tracks from "./tracks";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            tracks: []
        };
    }

    // get all of user's playlists
    componentDidMount = () => {
        axios.get('http://localhost:5000/playlists/')
            .then((res) => {
                console.log(res.data);
                this.setState({playlists: res.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    searchPlaylists = (e) => {
        console.log(e.target);
        console.log(e.target.value);
        axios.get(`http://localhost:5000/search/${e.target.value}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // get all tracks for selected playlist
    selectPlaylist = (index) => {
        console.log(this.state.playlists);
        const id = this.state.playlists[index].id;
        axios.get(`http://localhost:5000/tracks/${id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({tracks: res.data.slice(1)});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={(e) => this.searchPlaylists(e)}/>
                <Playlists playlists={this.state.playlists} selectPlaylist={this.selectPlaylist} />
                <Tracks tracks={this.state.tracks} />
            </div>
        )
    }
}

export default Dashboard;