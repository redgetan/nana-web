import React, { Component } from 'react'
const Rating = require('react-rating')
import Review from './Review'

export default class ReviewList extends Component {

  render() {
    return (
      <div>
        <div className='header_2'>Reviews</div>
        {
          this.props.reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))
        }
      </div>

    )
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }
  
}
