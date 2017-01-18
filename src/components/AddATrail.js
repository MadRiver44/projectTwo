import React, { Component } from 'react';

class AddATrail extends Component{

    handleSubmit(event) {
    event.preventDefault();
    this.props.postRequest();
    this.inputTrailName.value = "";
    this.inputLocation.value = "";
  }

  render(){


    return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" placeholder="Enter a Trail" value={this.props.inputTrailName} ref={(input) => this.inputTrailName = input} onChange={this.props.handleTrailChange} />
          <input type="text" placeholder="Enter Trail Location" value={this.props.inputLocation} ref={(input) =>this.inputLocation = input} onChange={this.props.handleLocationChange} />
          <input type="submit" value="Send it!"/>
        </form>
        )
  }
}

export default AddATrail;
