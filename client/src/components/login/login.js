import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class Login extends Component {

  loginWithSpotify = () => {
    axios.get('/api/auth/login', { withCredentials: true })
                .then((res) => {
                  window.location.href = res.data;
                })
                .catch((err) => {});
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