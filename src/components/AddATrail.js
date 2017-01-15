import React, { Component } from 'react';

class AddATrail extends Component{
/*  constructor(props){
    super(props);

  }*/


  render(){


    return (
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" value={this.props.inputValue} onChange={this.props.handleChange} />
          <input type="submit" value="Send it!"/>
        </form>
        )
  }
}

export default AddATrail;
