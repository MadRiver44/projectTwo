import React, { Component } from 'react';
//import { BrowserRouter, Match, Miss } from 'react-router';
//have to import react router 4 via npm
import axios from 'axios';
//import moment from 'moment';
import Header from './components/Header';
import TrailList from './components/TrailList';
import AddATrail from './components/AddATrail';
//import Review from './components/Review';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trails: {},// move from arr to [] {} // array of trails by firebase key
      bool: true ,// conditon for patch request to edit
      trailName: '',
      description: '',
      location: '',
      selectedTrail: '',
      reviews:[],
      review: '',
      value: '',
      trailsArray: []
    }


    // why bind? and what gets bound?
    this.handleTrailChange = this.handleTrailChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAnItem =this.deleteAnItem.bind(this);

  }


  handleSubmit(event) {
    event.preventDefault();
    this.postRequest();
  }

  handleTrailChange(event) {
    this.setState( {trailName: event.target.value} )

  }

  handleLocationChange(event){
    this.setState( {location: event.target.value} )
  }

  componentDidMount() { // on page load render all trails
    this.getRequest();
  };

  getRequest() {
    axios({
      url: '/trails.json',
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method: "GET"
  }).then((res) => {
      this.setState( {trails: res.data} )
      // console.log(res.data); // data property Object {FbkeyId :{reviews:[{user:'',review:''}], location: '', trailName: ''}
      const trailsData = res.data;
      this.setState( {trails: res.data} )
      // console.log( this.state.trails );
      let trails = [];
        trails = Object.keys(trailsData).map((id) => {
          const trail = trailsData[id];
          //console.log(id)
          console.log(trail)
          return {
            trailName: trail.trailName,
            location: trail.location,
            reviews: trail.reviews,
            key: id,
          }
      });

        //console.log(trails);
        trails.reverse()
        this.setState( {trailsArray: trails} );
        //console.log(this.state.trailsArray)

    }).catch((error) => {
    console.log(error);
  });
}



  postRequest() {
    // new
    let newTrail = {
      trailName: this.state.trailName,
      location: this.state.location,
      reviews: [{user: '',review:''} ],
    };
    console.log(newTrail)
    //new

    axios({
      url:'/trails.json',
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method: "POST",
      data: newTrail
    })
    .then((res) => {
      let trails = this.state.trails;
      let newTrail_Id = res.data.name;
      trails[newTrail_Id] = newTrail;
      //console.log(newTrail_Id)
      this.setState( {trails: trails});
      this.getRequest()
    })
      .catch((error) => {
        console.log(error);
    })
  }

  deleteAnItem(itemId) {
    console.log(itemId);
    axios({
      url: `/trails/${itemId}.json`,
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method: 'DELETE'
    })
      .then((res) => {
        let trails = this.state.trails;
        delete trails[itemId]
        this.setState( {trails} )
        console.log(res)
      })
        .catch((error) => {
          console.log(error);
        })
  }


/*getTrailInfo(event) {
  const id = event.target.id;
  //console.log(id)
  const selectedTrail = this.state.trailList.filter((trail) => {
    return trail.id === id;
  })[0];
  //console.log(selectedTrail)
  this.setState( {selectedTrail: id} )
  this.setState( {review: selectedTrail.review } )

}*/


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Header />
        <AddATrail
          inputTrialName={this.state.trailName}
          handleTrailChange={this.handleTrailChange}
          handleLocationChange={this.handleLocationChange}
          inputLocation={this.state.trails.location}
          handleSubmit={this.handleSubmit}

          onClick={this.getTrailInfo}
          />
         <TrailList  trailsArray={this.state.trailsArray} onClick={this.getTrailInfo} deleteAnItem={this.deleteAnItem}/>




          <button type="button" className="btn btn-danger">No Danger Here</button>

      </div>
    );
  }
}

export default App;


//  <Review onClick={this.getTrailInfo} selectedTrail={this.state.selectedTrail} />

