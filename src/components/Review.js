import React, { Component } from 'react';

class Review extends Component{
/*  constructor(props) {
    super(props);
  }*/
  render() {
    //console.log(this.props)
    return(
      <h2>{this.props.selectedTrail}</h2>
      )
  }
}

export default Review;
