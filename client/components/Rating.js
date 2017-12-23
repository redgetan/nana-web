import React, { Component } from 'react'

export default class Rating extends Component {

  render() {
    return (
      <div className='photographer_container'>
        <img className='user_photo_gallery_item' src={this.props.user.imageUrl} alt=""/>
        <ul className="service_summary_container">
          <li>Location: Toronto</li>
          <li>Duration: 1 hour</li>
          <li>Language: English, Mandarin</li>
        </ul>
        <div className="username">{this.props.user.username}</div>
        <div className="user_bio">{this.props.user.description}</div>
        <div className="guest_requirements">
          <p>Who can come</p>

          <br/>Guests ages 18 and up can attend.
          <br/>Government ID
          <br/>You’ll need to take a picture of yourself that matches the photo on your ID. This is so we can confirm who’s actually going on the experience. You’ll only have to do this once.
        </div>
        <br/>
        <a href="/photographer/:username/book" className="btn btn-primary">Book</a>

      </div>
    )
  }
  
  _voteForLink = async () => {
    // ... you'll implement this in chapter 6  
  }

}
