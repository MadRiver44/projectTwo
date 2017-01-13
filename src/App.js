import React, { Component } from 'react';
//import { BrowserRouter, Match, Miss } from 'react-router';
//have to import react router 4 via npm
import axios from 'axios';
import moment from 'moment';
import Header from './components/Header';
import TrailList from './components/TrailList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Header />

          <button type="button" className="btn btn-danger">No Danger Here</button>

      </div>
    );
  }
}

export default App;
