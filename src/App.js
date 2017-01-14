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
  constructor() {
    super();
    this.state = {
      trails: [], // array of trails by firebase key
      bool: true ,// conditon for patch request to edit
      trail: '',
      description:'',
    }
  }

componentDidMount() { // on page load render all trails
  this.getRequest();
};

getRequest() {
  axios.get('https://ski-trail-review.firebaseio.com/trails/.json')
  .then((res) => {
    console.log(res.data);

  })
  .catch((error) => {
    console.log(error)
  })
}

postRequest(info) {
  axios.post(`https://ski-trail-review.firebaseio.com/trail/${info}.json`)
  .then((res) =>{

  }).catch((error) => {
    console.log(error);
  })
}

addATrail(trailDetails) {
//  this.postRequest({this.state.trail: "Paradise"})
  this.setState( {trail: '', description: '', });


}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Header />
        <TrailList />

          <button type="button" className="btn btn-danger">No Danger Here</button>

      </div>
    );
  }
}

export default App;
