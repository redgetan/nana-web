import React, { Component } from 'react'

export default class Profile extends Component {

  render() {
    return (
      <div className='photographer_container'>
        <div className="username">{this.props.user.username}</div>
        <img className='user_photo_gallery_item' src={this.props.user.imageUrl} alt=""/>
        <ul className="service_summary_container">
          <li><span className="session_price">$45</span> per person</li>
          <li>Location: Toronto</li>
          <li>Duration: 1 hour</li>
          <li>Language: English, Mandarin</li>
        </ul>
        <div className="user_bio">{this.props.user.description}</div>
        <div className="guest_requirements">
          <p>Who can come</p>

          <br/>Guests ages 18 and up can attend.
          <br/>Government ID
          <br/>You’ll need to take a picture of yourself that matches the photo on your ID. This is so we can confirm who’s actually going on the experience. You’ll only have to do this once.
        </div>
        <br/>
        <a href="/photographer/:username/book" className="book_photographer_btn btn btn-primary">Book</a>
        <a href="/photographer/:username/message" className="contact_photographer_btn btn">Contact</a>

        <h3>Availability</h3>
        <div className='input-group date' ref={(input) => { this.datePicker = input }}>
          <input type='text' className="form-control" />
          <span className="input-group-addon">
            <span className="glyphicon glyphicon-calendar"></span>
          </span>
        </div>

      </div>
    )
  }

  componentDidMount() {
    $(this.datePicker).datetimepicker({
      inline: true
    })
  }

  componentWillUnmount() {
    $(this.datePicker).destroy()
  }
  
  _voteForLink = async () => {
    // ... you'll implement this in chapter 6  
  }

}
