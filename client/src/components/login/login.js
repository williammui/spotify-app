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
        <div className="login-text">
          <h1 className="title" style={{fontSize: "6rem"}}>CLASSIFY</h1>
          <h3 className="subtitle-small" style={{fontSize: "2.5rem"}}>Create genre specific playlists<br></br>from your Spotify library.</h3>
        </div>
        <button className="login-link" onClick={() => this.loginWithSpotify()}>Login With Spotify</button>
      </div>
    );
  }
}

export default Login;