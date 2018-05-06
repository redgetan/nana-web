import React, { Component } from 'react'

export default class Profile extends Component {

  state = {
    reviews: []
  }

  render() {
    return (
      <div className='user_profile_container col-xs-12 col-sm-7'>
        <div className="user_bio">
          <h2>Bio</h2>
          <pre>{this.props.user.bio || "User has no bio"}</pre>
        </div>
        <div className="service_details">
          <h2>What we'll do</h2>
          <p>{this.props.user.notes}</p>
        </div>
      </div>
    )
  }

  componentDidMount() {
    /*
        <div className='header_2'>Availability</div>
        <div className='book_datepicker' ref={(el) => { this.datePicker = el }}>
        </div>
    */
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
