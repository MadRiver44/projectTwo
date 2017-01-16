import React, { Component } from 'react';

class TrailList extends Component {
 constructor(props){
    super(props);

  }
  render() {
    let  renderedTrailArray = this.props.trailsArray.map((trail,i) => {
      console.log(trail); //trail is obj with trailName and FBkey, trail.key id just FB key
      return (
        <div>
          <li key={trail.key} onClick={this.props.getTrailInfo}>{trail.trailName} {trail.location}
          <button onClick={this.props.deleteAnItem(trail.key)}>
           <span aria-hidden="true">&times;</span></button>
          </li>
        </div>
        )
      });
//console.log(trail.key)
    return (
      <ul>
        {renderedTrailArray}
      </ul>
      )
  }
}
export default TrailList;

