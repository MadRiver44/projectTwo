import React, { Component } from 'react';

class TrailList extends Component {
 constructor(props){
    super(props);
    //this.deleteAnItem = this.deleteAnItem.bind(this)
    this.state ={
      edit: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const key = e.target.getAttribute('data-trail-key');
    const data = {
      trailName: this.trailName.value,
      location: this.location.value,
    };
    this.props.editTrail(key, data);
    this.setState({ edit: false });
  }
  editRender() {
    console.log(this.props.trailsArray)
    let array = [];
      for (let item in this.props.trailsArray){
        array.push(this.props.trailsArray[item])
        console.log(array); // an array of objects
    }
/*    let item = array.filter((trail,i) => {
      console.log(trail[i], this.props.selectedTrail)
      if (trail[i][this.props.selectedTrail] === this.props.selectedTrail){
        return trail[i]
      }
    });
    console.log(item)*/



    let  renderedTrailArray = array.map((trail,i) => {

      return (
        <div key={trail}>
        <input

          type="text"
          ref={(input) => this.trailName = input}
          // ref={(input) => this.props.editedTrailName = input}
          defaultValue={trail.trailName} />
        <input

          type="text"
          ref={(input) => this.location = input}
          // ref={(input) => this.props.editedTrailName = input}
          defaultValue={trail.location} />
          <button className="edit btn btn-danger" data-trail-key={trail.key} onClick={this.handleClick}>Save</button>
          <button className="review btn btn-success" onClick={() => {this.setState( {edit: false} )}}>Cancel</button>
        </div>
    )
})

        return (
          <div>
            {renderedTrailArray}
          </div>
          )
  }


  normalRender() {
    let  renderedTrailArray = this.props.trailsArray.map((trail,i) => {
      //console.log(this.props.trailsArray); //trail is obj with trailName and FBkey, trail.key id just FB key
      //console.log(trail.key)

      return (
          <li
          key={trail.key}

          onClick={this.props.getTrailInfo}>{trail.trailName} {trail.location}
          <button className="delete btn btn-danger" onClick={() => {this.props.deleteAnItem(trail.key)}}></button>
          <button className="review btn btn-success" onClick={() => {this.props.selectTrail(trail.key)}}></button>
          <button className="edit btn btn-success" onClick={() => {this.setState ( {edit: true} ) }}></button>
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

  render() {
   // console.log(this.props.selectedTrail)
    if (!this.state.edit) {
      return ( this.normalRender() );
    } else {
      return ( this.editRender() );
    }
  }
}

export default TrailList;

