import React, { Component } from 'react';

class Classification extends Component {

    getPlaylists = (type) => {
        this.props.onClick(type);
    }

    render() {
        return (
            <div>
                <h3>Classification</h3>
                <h2>Step 1</h2>
                <h1>Select how you would like to organize your music</h1>
                <button onClick={() => this.getPlaylists('genre')}>Genre</button>
            </div>
        );
    }
}

export default Classification;