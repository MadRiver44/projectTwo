import React, { Component } from 'react';

class TrailList extends Component {
/* constructor(props){
    super(props);
    //this.deleteAnItem = this.deleteAnItem.bind(this)
  }*/
  render() {
    let  renderedTrailArray = this.props.trailsArray.map((trail,i) => {
      //console.log(this.props.trailsArray); //trail is obj with trailName and FBkey, trail.key id just FB key
      //console.log(trail.key)
      return (

          <li
          key={trail.key}

          onClick={this.props.getTrailInfo}>{trail.trailName} {trail.location}
          <button className="delete btn btn-danger" onClick={() => {this.props.deleteAnItem(trail.key)}}></button>
          <button className="delete btn btn-success" onClick={() => {this.props.selectTrail(trail.key)}}></button>
          <button className="delete btn btn-success" onClick={() => {this.props.editTrail(trail.key)}}></button>
          </li>

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

