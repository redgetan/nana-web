import React, { Component } from 'react'
const Rating = require('react-rating')
import Review from './Review'

export default class ReviewList extends Component {

  render() {
    if (this.props.reviews.length === 0) {
      return <div></div>
    }
    
    if (this.props.reviews.length === 0) {
      return <div className='review_list_container'>
        <h2>Reviews</h2>
        <div>No reviews available</div>
      </div>
    }

    return (
      <div className='review_list_container'>
        <h2>Reviews</h2>
        <br/>
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
