import React, { Component } from 'react';
//import { BrowserRouter, Match, Miss } from 'react-router';
//have to import react router 4 via npm
import axios from 'axios';
//import moment from 'moment';
import Header from './components/Header';
import TrailList from './components/TrailList';
import AddATrail from './components/AddATrail';
import Review from './components/Review';
import ReviewList from './components/ReviewList';
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
      reviews:null,
      review: '',
      userName: '',
      trailsArray: [],
      editedTrailName: ''
    }
    this.postRequest = this.postRequest.bind(this);
    this.handleTrailChange = this.handleTrailChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.deleteAnItem = this.deleteAnItem.bind(this);
    this.addAReview = this.addAReview.bind(this);
    this.selectTrail = this.selectTrail.bind(this);
    this.handleUserChange =this.handleUserChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.postReview = this.postReview.bind(this);
    this.editTrail = this.editTrail.bind(this);

  }




  handleTrailChange(event) {
    this.setState( {trailName: event.target.value} )
  }

  handleLocationChange(event){
    this.setState( {location: event.target.value} )
  }

  componentDidMount() {
    this.getRequest();
  };

  getRequest() {
    axios({
      url: '/trails.json',
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method: "GET"
  }).then((res) => {
      this.setState( {trails: res.data} )
     // data property Object {FbkeyId :{reviews:[{user:'',review:''}], location: '', trailName: ''}
      const trailsData = res.data;
      this.setState( {trails: res.data} )
      let trails = [];
        trails = Object.keys(trailsData).map((id) => {
          const trail = trailsData[id];
          return {
            trailName: trail.trailName,
            location: trail.location,
            reviews: trail.reviews,
            key: id,
          }

      });

        trails.reverse()
        this.setState( {trailsArray: trails} );

    }).catch((error) => {
    console.log(error);
  });
}



  postRequest() {
    let newTrail = {
      trailName: this.state.trailName,
      location: this.state.location

    };
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
        this.getRequest();
      })
        .catch((error) => {
          console.log(error);
        })
  }

  selectTrail(itemId) {
    this.setState( {selectedTrail: itemId} )
    return this.state.selectedTrail;
  }

  handleReviewSubmit(event) {
    event.preventDefault();
    this.postReview()
   }

  handleReviewChange(event) {
    this.setState( {review: event.target.value} )
  }

  handleUserChange(event) {
    this.setState( {userName: event.target.value} )
  }

  addAReview() {
    let content;
    if(this.state.selectedTrail) {
      let selectedTrail = this.state.trails[this.state.selectedTrail];
      content = (
        <div>
            <h3>Enter a Review</h3>
            <h5>{selectedTrail.trailName} {selectedTrail.location}</h5>

            <form onSubmit={this.handleReviewSubmit}>
              <div className="form-group">
                <input type="text" onChange={this.handleUserChange}
                  value={this.state.userName}
                  id="userName" name="username"
                  className="form-control"
                  placeholder="user name"/>
              </div>
             <div className="form-group">
                <input type="text" onChange={this.handleReviewChange}
                value={this.state.review}
                id="review" name="userReview"
                className="form-control"
                rows="3"
                placeholder="review"/>
             </div>
             <input type="submit"  value="Send it"/>
            </form>
         </div>
        )
    }
    return content;
  }

  postReview() {
    let addReview = {
      review: this.state.review,
      userName: this.state.userName
    };
    let key = this.state.selectedTrail;
    axios({
      url: `/trails/${key}/reviews/.json`,
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method:"POST",
      data: addReview
    }).then((res) => {
      this.setState({
        userName: "",
        review: ""
      })
    }).catch((error)=> {
      console.log(error)
    })
  }



  editTrail(itemId, data) {
    let selectedTrail = this.state.trails[itemId];
    axios({
      url: `/trails/${itemId}.json`,
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method: 'PATCH',
      data: data
    }).then((res) => {
      this.getRequest();

    }).catch((error) => {
        console.log(error)
    })
  }

  renderTrailToEdit() {
    let content;
    let object = this.state.trails[this.state.selectedTrail]
    if(object) {
      if(!this.state.edit){
        content = (
            <div className="d-flex justify-content-end mb-3">
            <h1>{object.trailName} </h1>
          </div>
        );
      }else {
        content = (
          <div>
            <div className="d-flex justify-content-end mb-3">
              <button onClick={() => {this.editTrail}} >Save</button>
            </div>
            <input type="text" />
            <input type="text" className="w-100" refs="editTrailName" />
          </div>
          )
        }
      }
      return content;
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
          postRequest={this.postRequest}
          inputTrialName={this.state.trailName}
          handleTrailChange={this.handleTrailChange}
          handleLocationChange={this.handleLocationChange}
          deleteAnItem={this.deleteAnItem}
          inputLocation={this.state.trails.location}
          handleSubmit={this.handleSubmit}
          onClick={this.getTrailInfo}
          />
         <TrailList
          trailsArray={this.state.trailsArray}
          onClick={this.getTrailInfo}
          deleteAnItem={this.deleteAnItem}
          addAReview={this.addAReview}
          selectTrail={this.selectTrail}
          handleSubmit={this.handleSubmit}
          editTrail={this.editTrail}
          editedTrailName={this.state.editedTrailName}

          />

          <div>{this.addAReview()}</div>



      </div>
    );
  }
}

export default App;
