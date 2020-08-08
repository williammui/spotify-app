import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './login.css';

class Login extends Component {

  loginWithSpotify = () => {
      window.location.href='http://localhost:5000/login';
  }

  render() {
    return (
      <div className="login-bg">
        <div className="login-container">
          <h1 className="title">CLASSIFY</h1>
          <h2 className="subtitle">Organize Your Music.</h2>
          <button className="login-link" onClick={() => this.loginWithSpotify()}>Login With Spotify</button>
        </div>
      </div>
    );
  }
}

export default Login;