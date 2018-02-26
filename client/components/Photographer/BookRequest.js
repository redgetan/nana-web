import React, { Component } from 'react'
const Rating = require('react-rating')
import Config from './../../config/config'
import ClientAPI from './../../api/client_api'
import ContactForm from "./ContactForm"

export default class BookRequest extends Component {

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="book_request_form col-sm-5 col-xs-12">
        <form className='' onSubmit={this.bookRequest}>
          <div className="cost"><span className="session_price">$ {this.props.user.price}</span> per person</div>
          <div className='user_rating'>
            <Rating 
              emptySymbol="fa fa-star-o fa"
              fullSymbol="fa fa-star fa"
              initialRating={5}
              readonly={true}
            />
          </div>
          <input type='submit' className='book_request_btn btn secondary_action_btn pull-right' value="Contact Photographer" data-toggle="modal" data-target="#contact_modal" />
        </form>
        <ContactForm user={this.props.user} />
      </div>
    )
  }

  bookRequest = (event) => {
    event.preventDefault()

    console.log("button clicked")
  }

}
