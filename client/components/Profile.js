import React, { Component } from 'react'
import ReviewList from './../components/ReviewList'

export default class Profile extends Component {

  state = {
    reviews: []
  }

  render() {
    return (
      <div className='user_profile_container col-sm-7'>
        <div className="row">
          <div className='user_avatar_container' >
            <img className='user_avatar' src={this.props.user.avatar} alt=""/>
            <div className="username">{this.props.user.email}</div>
          </div>
          <div className="service_summary">
            <div className="location"><i className='fa fa-bank'></i>Toronto</div>
            <div className="duration"><i className='fa fa-clock-o'></i>2 hours</div>
            <div className="language"><i className='fa fa-comments'></i>Offered in English, Russian</div>
            <div className="camera_specs"><i className='fa fa-camera'></i>Nikon D800</div>
          </div>
        </div>
        <div className="user_bio">
          <h1>About the Photographer</h1>
          <p>I'm an award-winning street photographer who love shooting people in crowded places. My work has been exhibited and published in many places. I love meeting new people. I've always known that the best thing I can do is photography, so I love to meet either people who loves photography or love being photographed. Let's have fun shooting together!</p>
          {this.props.user.description}
          https://poupayphoto.com/airbnb/6ggi7dt2pymfp74lzc3z1qixwv5ucs
        </div>
        <div className="service_details">
          <h1>What we'll do</h1>
          <p>We’ll walk around Times Square to shoot the most iconic place in New York City. As an award-winning street photographer photographer, I will provide you a photoshoot around Times Square with my professional camera. If you prefer a photo lesson, I will help you learn how to set up your camera at day or night to capture your moment in the way you want as well.</p>
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
