import React, { Component } from 'react'
const Rating = require('react-rating')
import Config from './../config/config'
import ClientAPI from './../api/client_api'

export default class BookRequest extends Component {

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="book_request_form col-sm-5">
        <form className='' onSubmit={this.bookRequest}>
          <div className="cost"><span className="session_price">$60</span> per person</div>
          <div className='user_rating'>
            <Rating 
              emptySymbol="fa fa-star-o fa"
              fullSymbol="fa fa-star fa"
              initialRating={5}
              readonly={true}
            />
          </div>
          <input type='submit' className='btn btn-primary pull-right' value="Contact Photographer" />
        </form>
      </div>
    )
  }

  bookRequest = (event) => {
    event.preventDefault()

    console.log("button clicked")
  }

}
