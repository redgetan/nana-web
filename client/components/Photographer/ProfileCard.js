import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const Rating = require('react-rating')

import PhotoSlider from './../Widget/PhotoSlider'


export default class ProfileCard extends Component {


  componentWillMount() {
    const coverPhotoIndex = this.props.user.photos.findIndex((photo) => { return photo.is_cover === true })
    if (coverPhotoIndex >= 0) {
      const coverPhoto = this.props.user.photos.splice(coverPhotoIndex, 1)[0]
      this.props.user.photos.unshift(coverPhoto)
    }
  }

  render() {
    return (
      <div className="photo_card">
        <div className="author_header">
          <div className="user_avatar"><img src="https://pbs.twimg.com/profile_images/763917100624715776/C8hiV68x_bigger.jpg" alt=""/></div>
          <div className="username">{this.props.user.email}</div>
        </div>
        <PhotoSlider photos={this.props.user.photos} userId={this.props.user.id} />
        <Link className="profile_card_bottom" to={`/users/${this.props.user.id}`} >
          <div className="user_rating">
            <Rating 
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              readonly={true}
              initialRating={5}
            />
          </div>
          <div className="cost"><span className="session_price">$100</span> per person</div>
        </Link>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
}
