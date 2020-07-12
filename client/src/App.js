import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Login from "./components/login";
import Dashboard from "./components/dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <h1>CLASSIFY</h1>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/about" />
      </Router>
    );
  }
}

export default App;
