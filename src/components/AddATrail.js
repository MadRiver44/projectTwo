import React, { Component } from 'react';

class AddATrail extends Component{
/*  constructor(props){
    super(props);

  }*/


  render(){


    return (
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" placeholder="Enter a Trail" value={this.props.inputTrailName} ref="inputTrailName" onChange={this.props.handleTrailChange} />
          <input type="text" placeholder="Enter Trail Location" value={this.props.inputLocation} onChange={this.props.handleLocationChange} />
          <input type="submit" value="Send it!"/>
        </form>
        )
  }
}

export default AddATrail;
