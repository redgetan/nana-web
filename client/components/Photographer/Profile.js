import React, { Component } from 'react'
import ReviewList from './../Review/ReviewList'

export default class Profile extends Component {

  state = {
    reviews: []
  }

  render() {
    return (
      <div className='user_profile_container col-xs-12 col-sm-7'>
        <div className="user_bio">
          <h1>About Photographer</h1>
          <p>{this.props.user.bio}</p>
        </div>
        <div className="service_details">
          <h1>What we'll do</h1>
          <p>{this.props.user.notes}</p>
        </div>
        <ReviewList reviews={this.props.user.reviews} />
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
