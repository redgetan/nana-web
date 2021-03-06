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
    const price = this.props.user.price 
    const currency = this.props.user.currency
    const user_id = this.props.user.username ? this.props.user.username : this.props.user.id


    return (
      <div className="photo_card">
        <div className="author_header">
          <div className="user_avatar"><img src="https://pbs.twimg.com/profile_images/763917100624715776/C8hiV68x_bigger.jpg" alt=""/></div>
          <div className="username">{this.props.user.email}</div>
        </div>
        <PhotoSlider photos={this.props.user.photos} userId={user_id} />
        <Link className="profile_card_bottom" to={`/users/${user_id}`} >
          <div className="user_rating">
            <Rating 
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              readonly={true}
              initialRating={5}
            />
          </div>
          <div className="cost"><span className="session_price">${price}</span> {currency} per hour</div>
        </Link>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
}
