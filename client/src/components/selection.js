import React, { Component } from 'react';

class Selection extends Component {
    
    info = () => {
        if (this.props.trackCount) {
            return (
                <div>
                    <h2>We found a total of</h2>
                    <h1>{this.props.trackCount}</h1>
                    <h2>songs in your library</h2>
                </div>
            );
        }
    }

    playlists = () => {
        if (this.props.trackCount) {
            const playlistNames = Object.keys(this.props.playlists)
            return playlistNames.map((playlist) => {
                return <h5>{playlist}</h5>
            });
        }
    }

    render() {
        return (
            <div>
                <h3>Selection Page</h3>
                { this.info() }
                { this.playlists() }
            </div>
        );
    }
}

export default Selection;