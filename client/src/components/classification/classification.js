import React, { Component } from 'react';
import './classification.css';

class Classification extends Component {

    getPlaylists = (type) => {
        this.props.onClick(type);
    }

    render() {
        return (
            <div className="classification-container">
                <div className="classification-heading">
                    <h1>Step 1</h1>
                </div>
                <div className="classification-text">
                    <h2>Select how you would like to organize your music.</h2>
                </div>
                <div className="classification-options">
                    <button onClick={() => this.getPlaylists('genre')}>Genre</button>
                </div>
            </div>
        );
    }
}

export default Classification;