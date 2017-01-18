import React, { Component } from 'react';

class TrailList extends Component {
 constructor(props){
    super(props);
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
    let array = [];
      for (let item in this.props.trailsArray){
        array.push(this.props.trailsArray[item])
    }

    let  renderedTrailArray = array.map((trail,i) => {

      return (
        <div key={trail}>
        <input

          type="text"
          ref={(input) => this.trailName = input}
           />
        <input

          type="text"
          ref={(input) => this.location = input}
          />
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
      return (
          <li
          key={trail.key}

          onClick={this.props.getTrailInfo}>{trail.trailName} {trail.location}
          <button className="delete btn btn-danger" onClick={() => {this.props.deleteAnItem(trail.key)}}>Delete</button>
          <button className="review btn btn-success" onClick={() => {this.props.selectTrail(trail.key)}}>Review</button>
          <button className="edit btn btn-info" onClick={() => {this.setState ( {edit: true} ) }}>Edit</button>
          </li>

        )
      });

    return (
      <ul>
        {renderedTrailArray}
      </ul>
      )
  }

  render() {
    if (!this.state.edit) {
      return ( this.normalRender() );
    } else {
      return ( this.editRender() );
    }
  }
}

export default TrailList;

//defaultValue={trail.trailName}
//defaultValue={trail.location}
