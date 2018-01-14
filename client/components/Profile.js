import React, { Component } from 'react'

export default class Profile extends Component {

  render() {
    return (
      <div className='photographer_container'>
        <div className="username">{this.props.user.email}</div>
        <img className='user_photo_gallery_item' src={this.props.user.avatar} alt=""/>
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
        <a href={`/${this.props.user.id}/book/order_details`} className="book_photographer_btn btn btn-primary">Book</a>
        <a href={`/${this.props.user.id}/message`} className="contact_photographer_btn btn">Contact</a>

        <div className='header_2'>Availability</div>
        <div className='book_datepicker' ref={(el) => { this.datePicker = el }}>
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
    
  }
  
  _voteForLink = async () => {
    // ... you'll implement this in chapter 6  
  }

}
