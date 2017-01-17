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
      edit: true,
    }


    // why bind? and what gets bound?
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
          //console.log(trail)
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
      /*reviews: {user: '',review:''}  dont need to pass this in to enter a new trail*/
    };
    //console.log(newTrail)
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
      //  console.log(trails);
        delete trails[itemId]
        this.setState( {trails} )
        this.getRequest();
       // console.log(res)
      })
        .catch((error) => {
          console.log(error);
        })
  }

  selectTrail(itemId) {
    this.setState( {selectedTrail: itemId} )
    //console.log( this.selectTrail)
    //console.log(itemId);
    //console.log(this.state.selectedTrail)
    return this.state.selectedTrail;
  }

  handleReviewSubmit(event) {
    event.preventDefault();
    this.postReview()
   }

  handleReviewChange(event) {
   // console.log(event)
    this.setState( {review: event.target.value} )
  }

  handleUserChange(event) {
   // console.log(event)
    this.setState( {userName: event.target.value} )
  }

  addAReview() {
    let content;
    if(this.state.selectedTrail) {
      //console.log(this.state.selectedTrail)
      let selectedTrail = this.state.trails[this.state.selectedTrail];

      //console.log(selectedTrail);
      content = (
        <div>
            <h3>Enter a Review</h3>
            <h5>{selectedTrail.trailName} {selectedTrail.location}</h5>

            <form onSubmit={this.handleReviewSubmit}>
              <div className="form-group">
                <input type="text" onChange={this.handleUserChange}
                  value={this.state.userName}
                  //ref={(input) => this.state.userName = input}
                  id="userName" name="username"
                  className="form-control"
                  placeholder="user name"/>
              </div>
             <div className="form-group">
                <input type="text" onChange={this.handleReviewChange}
                value={this.state.review}
               // ref={(input) => this.state.review = input}
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
    console.log(this.state.review, this.state.userName)
    let addReview = {
      review: this.state.review,
      userName: this.state.userName
    };
    console.log(addReview)
    //let reviewArrayIndex = this.state.trails[this.state.selectedTrail].reviews.length;
    //console
   // console.log(reviewArrayIndex)
    let key = this.state.selectedTrail;
    console.log(key)
//${reviewArrayIndex+ 1}
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
      //let trails = this.state.trails
      //let reviews = reviews
      //let newReviewId =
      //do something

      console.log(res.data.name)
    }).catch((error)=> {
      console.log(error)
    })
  }

  editTrial(itemId) {
    let selectedTrail = this.state.trails[itemId];
    let edits ={trailName: this.state.traillName, userName: this.state.userName}
    axios({
      url: `/trails/${itemId}.json`,
      baseURL: 'https://ski-trail-review.firebaseio.com/',
      method: 'PATCH',
      data: edits
    }).then((res) => {
      this.setState( {trails: this.state.trails, edit: false} )

    }).catch((error) => {
        console.log(error)
    })
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
          />
        <Review
          handleReviewSubmit={this.handleReviewSubmit}
          addAReview={this.addAReview}
          handleReviewChange={this.handleReviewChange}
          handleUserChange={this.handleUserChange}
          deleteAnItem={this.deleteAnItem}
          handleSubmit={this.handleSubmit}
          />
          <ReviewList trailsArray={this.state.trails} selectedTrail={this.state.selectedTrail} />

          <div>{this.addAReview()}</div>





        {/*  <button type="button" className="btn btn-danger">No Danger Here</button> */}

      </div>
    );
  }
}

export default App;


//  <Review onClick={this.getTrailInfo} selectedTrail={this.state.selectedTrail} />
//<div>{this.renderReviews()}</div>
