import React, { Component } from 'react';

class Step1 extends Component {

    getPlaylists = (type) => {
        this.props.onClick(type);
    }

    render() {
        if (this.props.user) {
            return (
                <div className="step-container">
                    <h2 className="title step-heading"><span>Step 1</span></h2>
                    <h3 className="text step-description">Select how you would like to organize your music.</h3>
                    <div className="center">
                        <button onClick={() => this.getPlaylists('genre')}>GENRE</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="step-container inactive">
                    <h2 className="title step-heading"><span>Step 1</span></h2>
                </div>
            );
        }
    }
}

export default Step1;