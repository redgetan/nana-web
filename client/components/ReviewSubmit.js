import React, { Component } from 'react'
const Rating = require('react-rating')
import Config from './../config/config'
import ClientAPI from './../api/client_api'

export default class ReviewSubmit extends Component {

  state = {
    rating: 0,
    text: '',
    canReview: false
  }

  componentWillMount() {
    if (Config.getCurrentUser()) this.setState({ canReview: true })
  }

  componentWillUnmount() {
  }

  onRatingChanged = (rating) => {
    this.setState({ rating: rating })
  }

  render() {
    if (!this.state.canReview) return <div></div>

    return (
      <div className="review_submit_form">
        <div className='header_2'>Write a Review for {this.props.user.email}</div>
        <form className='' onSubmit={this.submitReview}>
          <div className='rating_container'>
            <Rating 
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={this.state.rating}
              onChange={this.onRatingChanged}
            />
          </div>
          <textarea
            className="review_description col-xs-12"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
            type='textarea'
            placeholder=''
          />
          <input type='submit' className='btn btn-primary pull-right' value="Post Review" />
        </form>
      </div>
    )
  }

  submitReview = (event) => {
    event.preventDefault()

    const { rating, text } = this.state

    ClientAPI.createReview({ 
      rating: rating,
      text: text,
      user_id: this.props.user.id
    }).then((res) => {
      if (res.body && res.body.error) {
        alert(res.body.error)
      } else {
        console.log("review created")
        this.props.onReviewCreated(res.body)
      }
    }).catch((err) => {
      alert("Unable to submit review. try again later")
    })

  }

}
