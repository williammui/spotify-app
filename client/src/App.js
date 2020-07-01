import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Login from "./components/login";

class App extends Component {
  render() {
    return (
      <Router>
        <h1>HARMONY</h1>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" />
        <Route path="/about" />
      </Router>
    );
  }
}

export default App;
