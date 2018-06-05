import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import { Link } from 'react-router-dom'
import FlashMessage from "./../components/Widget/FlashMessage"

export default class BookRequestScreen extends Component {

  state = {
    bookRequest: null,
    notFound: false,
    status: {}
  }

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    window.scrollTo(0, 0)

    const token = this.props.match.params.token

    ClientAPI.getBookRequest(token).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        this.setState({ bookRequest: res.body })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  onAcceptRequest = (event) => {
    const token = this.props.match.params.token

    ClientAPI.acceptBookRequest(token).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        this.setState({ status: { success: "You have accepted this booking. You will be paid shortly." } })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  }

  render() {
    if (this.state.notFound) {
      return <div className='container'>Book Request not found</div>
    }

    if (!this.state.bookRequest) {
      return (
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
      )
    } 

    const profileLink = "/" + this.state.bookRequest.photographer.username
    const photographerName = this.state.bookRequest.photographer.username

    const customerLink = "/users/" + this.state.bookRequest.user.id
    const isBookRequestRecepient = this.props.user && this.props.user.id === this.state.bookRequest.photographer.id

    return (
      <div>
        <div className="container book_request_container">
          <FlashMessage status={this.state.status} />
          <div className='photographer block'>
            Photoshoot with <Link to={profileLink} >{photographerName}</Link>
            <img src={this.state.bookRequest.photographer.avatar} className='user_avatar' />
          </div>

          <div className="vertical_spacing line" />

          <div className="service_date_row block">
            <div className="service_date">{moment(this.state.bookRequest.start_date).format("LL")}</div>
            <div className="service_time_range">18:00 − 22:00</div>
            <div className="service_location">{this.state.bookRequest.location && this.state.bookRequest.location}</div>
            <div className="vertical_spacing line" />
          </div>

          <div className="service_date_row block">
            <div className="customer">Booked by <Link to={customerLink} >{this.state.bookRequest.user.name}</Link></div>
            <div className="customer_email">{this.state.bookRequest.user.email}</div>
            <div className="vertical_spacing line" />
          </div>

          <div className="price_total_row block">
            <div className="price_total_label pull-left">Total</div> 
            <div className="pull-right">${this.state.bookRequest.price}</div> 
          </div>

          {
            isBookRequestRecepient &&
              <div>
                <button onClick={this.onAcceptRequest} className="accept_book_request_btn btn nana_primary_btn">Accept Booking</button>
                <p>By clicking accept, the customer will be charged with the corresponding payment. You agree to fullfill your duties on the agreed upon date. For more information on how we process payments for photographers and users, visit our <Link to="/payment_policy">payment policy</Link> </p>
              </div>
          }


        </div>
      </div>
    )

  }
}

