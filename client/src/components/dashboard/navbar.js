import React from "react";
import './dashboard.css';

const Navbar = (props) => {
    if (props.user) {
        return (
            <div className="navbar-container">
                <a href="/dashboard"><h1 className="subtitle-med">CLASSIFY</h1></a>
                <div style={{display: "flex", alignItems: "center"}}>
                    <h2 className="text">{props.user}</h2>
                    <button onClick={props.reset}>RESET</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="navbar-container">
                <h1 className="subtitle-med">CLASSIFY</h1>
                <button onClick={props.login}>LOGIN WITH SPOTIFY</button>
            </div>
        )
    }
};

export default Navbar;