import React, { Component } from 'react'
import ReviewList from './../ReviewList'

export default class Profile extends Component {

  state = {
    reviews: []
  }

  render() {
    return (
      <div className='user_profile_container col-xs-12 col-sm-7'>
        <div className="row">
          <div className='user_avatar_container col-xs-12 col-sm-5' >
            <img className='user_avatar' src={this.props.user.avatar} alt=""/>
            <div className="username">{this.props.user.username}</div>
          </div>
          <div className="service_summary col-xs-12 col-sm-7">
            <div className="location"><i className='fa fa-bank'></i>Toronto</div>
            <div className="duration"><i className='fa fa-clock-o'></i>2 hours</div>
            <div className="language"><i className='fa fa-comments'></i>Offered in English</div>
            <div className="camera_specs"><i className='fa fa-camera'></i>Nikon D800</div>
          </div>
        </div>
        <div className="user_bio">
          <h1>About the Photographer</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          {this.props.user.description}
        </div>
        <div className="service_details">
          <h1>What we'll do</h1>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
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
