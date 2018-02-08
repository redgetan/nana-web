import React, { Component } from 'react'
const Rating = require('react-rating')
import Config from './../config/config'
import ClientAPI from './../api/client_api'

export default class BookRequest extends Component {

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  emailPhotographer(email, name, text) {
    ClientAPI.createMessage({
      sender_email: email,
      name: name,
      text: text,
      recipient_id: this.props.user.id
    }).then(() => {
      if (res.body && res.body.error) {
        alert("Message sending failed")
      } else {
        alert("Message sent")
      }
    }).catch((err) => {
      alert("Message sending failed")
    })
  }

  render() {
    return (
      <div className="book_request_form col-sm-5 col-xs-12">
        <form className='' onSubmit={this.bookRequest}>
          <div className="cost"><span className="session_price">$100</span> per person</div>
          <div className='user_rating'>
            <Rating 
              emptySymbol="fa fa-star-o fa"
              fullSymbol="fa fa-star fa"
              initialRating={5}
              readonly={true}
            />
          </div>
          <input type='submit' className='book_request_btn btn btn-primary pull-right' value="Contact Photographer" />
        </form>
      </div>
    )
  }

  bookRequest = (event) => {
    event.preventDefault()

    console.log("button clicked")
  }

}
