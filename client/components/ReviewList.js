import React, { Component } from 'react'
const Rating = require('react-rating')

export default class ReviewList extends Component {

  render() {
    return (
      <div>
        reviews

        <Rating 
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
        />
      </div>

    )
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }
  
}
