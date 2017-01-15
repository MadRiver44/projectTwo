import React, { Component } from 'react';

class TrailList extends Component {
/*  constructor(props){
    super(props);
  }*/
  render() {
    let trailList = this.props.trails.map((trail,i) => {
      //console.log(trail); //trail is obj with trailName and FBkey, trail.key id just FB key
      return (
        <li key={trail.key} onClick={this.props.getTrailInfo}>{trail.trailName}</li>
        )
      });

    return (

      <ul>
        {trailList}
      </ul>

      )
  }
}
export default TrailList;
