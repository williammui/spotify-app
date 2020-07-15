import React, { Component } from 'react';
import './login.css';

class Login extends Component {

  render() {
    return (
      <div className="login-bg">
        <div className="login-container">
          <h1 className="login-title">CLASSIFY</h1>
          <h2 className="login-subtitle">Organize Your Music</h2>
          <a href="http://localhost:5000/login" className="login-link">Login With Spotify</a>
        </div>
      </div>
    );
  }
}

export default Login;