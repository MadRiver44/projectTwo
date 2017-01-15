import React, { Component } from 'react';
//import { BrowserRouter, Match, Miss } from 'react-router';
//have to import react router 4 via npm
import axios from 'axios';
//import moment from 'moment';
import Header from './components/Header';
import TrailList from './components/TrailList';
import AddATrail from './components/AddATrail';
import Review from './components/Review';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trails: [], // array of trails by firebase key
      bool: true ,// conditon for patch request to edit
      trailName: '',
      description: '',
      location: '',
      selectedTrail: '',
      reviews:[],
      review: '',
      value: '',
    }


    // why bind? and what gets bound?
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    this.postRequest();
  }

  handleChange(event) {
    this.setState({ trailName: event.target.value})

  }

  componentDidMount() { // on page load render all trails
    this.getRequest();
  };

  getRequest() {
    axios.get('https://ski-trail-review.firebaseio.com/trails/.json')
    .then((res) => {
      console.log(res.data);
      const data = res.data
      let trails = [];
       if(data) {
        trails = Object.keys(data).map((id) => {
          const trail = data[id];
          return {
            trailName: trail.trailName,
            key: id
          }
        });
       }
       trails.reverse();
       this.setState( {trails} )
    })
    .catch((error) => {
      console.log(error)
    })
  }

  postRequest() {
    axios.post('https://ski-trail-review.firebaseio.com/trails/.json',{
      trailName: this.state.trailName,
      reviews: this.state.review,
      location: this.state.location,
      description: this.state.description
    })
    .then(() =>{
      this.setState( {trailName: ''});
      this.getRequest()

    }).catch((error) => {
      console.log(error);
    })
  }


getTrailInfo(event) {
  const id = event.target.id;
  //console.log(id)
  const selectedTrail = this.state.trailList.filter((trail) => {
    return trail.id === id;
  })[0];
  //console.log(selectedTrail)
  this.setState( {selectedTrail: id} )
  this.setState( {review: selectedTrail.review } )

}


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Header />
        <AddATrail
          inputValue={this.state.trailName}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}

          onClick={this.getTrailInfo}
          />
        <TrailList  trails={this.state.trails} onClick={this.getTrailInfo}/>
        <Review onClick={this.getTrailInfo} selectedTrail={this.state.selectedTrail} />



          <button type="button" className="btn btn-danger">No Danger Here</button>

      </div>
    );
  }
}

export default App;



