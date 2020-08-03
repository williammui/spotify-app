import React, { Component } from 'react';
import './login.css';

class Login extends Component {

  render() {
    return (
      <div className="login-bg">
        <div className="login-text">
          <h1 className="title">CLASSIFY</h1>
          <h2 className="subtitle">Organize Your Music.</h2>
        </div>
        <div className="login-spotify">
          <a href="http://localhost:5000/login" className="login-link">Login With Spotify</a>
        </div>
      </div>
    );
  }
}

export default Login;