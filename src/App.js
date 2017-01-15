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
    }


    // why bind? and what gets bound?
    this.handleTrailChange = this.handleTrailChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
      //console.log(this.state.trails);

  })
/*    .then((res) => {
      // console.log(res.data);
      const data = res.data
      console.log(res)
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
      // trails.reverse();

       this.setState( {trails} )*/

    .catch((error) => {
      console.log(error)
    })
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*  getTodos() {
    axios({
      url: '/todos.json',
      baseURL: 'https://todo-app-f7821.firebaseio.com/',
      method: "GET"
    }).then((response) => {
     // console.log(response.data)
      this.setState({ todos: response.data });
      console.log(this.state.todos)
    }).catch((error) => {
      console.log(error);
    });
  }*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

/*      trailName: this.state.trailName,
      reviews: this.state.review,
      location: this.state.location,
      description: this.state.description
*/

    .then((res) => {
      let trails = this.state.trails;
      let newTrail_Id = res.data.name;
      trails[newTrail_Id] = newTrail;
      //console.log(newTrail_Id)
      this.setState( {trails: trails});
      this.getRequest()

    }).catch((error) => {
      console.log(error);
    })
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*    createTodo(todoText) {
    let newTodo = { title: todoText, createdAt: new Date() };

    axios({
      url: '/todos.json',
      baseURL: 'https://todo-app-f7821.firebaseio.com/',
      method: "POST",
      data: newTodo
    }).then((response) => {
      let todos = this.state.todos;
      let newTodoId = response.data.name;
      todos[newTodoId] = newTodo;
      this.setState({ todos: todos });
    }).catch((error) => {
      console.log(error);
    });
  }*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
         <TrailList  trails={this.state.trails} onClick={this.getTrailInfo}/>




          <button type="button" className="btn btn-danger">No Danger Here</button>

      </div>
    );
  }
}

export default App;


//  <Review onClick={this.getTrailInfo} selectedTrail={this.state.selectedTrail} />

