import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  loginSpotify = () => {
    console.log('login button clicked');
    axios.get('http://localhost:5000/auth/login');
  }


  render() {
    return (
      <a href="http://localhost:5000/auth/login">Login With Spotify</a>
    );
  }
}

export default Login;