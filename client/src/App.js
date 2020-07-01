import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Login from "./components/login";
import SelectPlaylist from "./components/select-playlist";

class App extends Component {
  render() {
    return (
      <Router>
        <h1>ENSEMBLE</h1>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={SelectPlaylist}/>
        <Route path="/about" />
      </Router>
    );
  }
}

export default App;
