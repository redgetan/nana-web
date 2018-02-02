import React, { Component } from 'react'
const Rating = require('react-rating')
import Review from './Review'

export default class ReviewList extends Component {

  render() {
    return (
      <div>
        <h1>Reviews</h1>
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
