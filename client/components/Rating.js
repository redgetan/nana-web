import React, { Component } from 'react'

export default class Rating extends Component {

  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    )
  }
  
  _voteForLink = async () => {
    // ... you'll implement this in chapter 6  
  }

}
