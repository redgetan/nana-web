import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import FlashMessage from "./../components/Widget/FlashMessage"

export default class BookRequestScreen extends Component {

  state = {
    bookRequest: null,
    notFound: false,
    status: {},
    isSubmitting: false
  }

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    window.scrollTo(0, 0)

    this.loadBookRequest()
  }

  loadBookRequest() {
    const token = this.props.match.params.token

    return ClientAPI.getBookRequest(token).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        this.setState({ bookRequest: res.body })
      }

      return Promise.resolve({})
    }).catch((err) => {
      console.log("fail..")
    })

  }

  onAcceptRequest = (event) => {
    this.setState({ isSubmitting: true })
    this.setState({ status: {}})

    const token = this.props.match.params.token

    ClientAPI.acceptBookRequest(token).then((res) => {

      if (res.body && res.body.error) {
        this.setState({ status: { error: res.body.error }})
        this.setState({ isSubmitting: false })
      } else {
        this.loadBookRequest().then(() => {
          const isFree = this.state.bookRequest.price === 0
          const message = isFree ? "You have accepted this booking" : "You have accepted this booking. You will be paid shortly."
          this.setState({ status: { success: message  } })
          this.setState({ isSubmitting: false })
        })
      }
    }).catch((err) => {
      console.log("fail..")
      this.setState({ isSubmitting: false })
    })
  }

  render() {
    const currentUser = Config.getCurrentUser()

    if (!currentUser) {
      return <Redirect to={`/signin?redirect=${window.location.href}`} />
    }

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
    const isFree = this.state.bookRequest.price === 0

    return (
      <div>
        <div className="container book_request_container">
          <FlashMessage status={this.state.status} clearStatus={() => { this.setState({ status: {} }) }} />

          <div className="request_status block">
            <div className='book_request_status_label'>Status: </div>
            <div className='book_request_status_value'>
              {
                this.state.bookRequest.is_accepted &&
                  <div className='accepted'>Accepted</div>
              }
              {
                !this.state.bookRequest.is_accepted &&
                  <div className='pending'>Pending</div>
              }
            </div>
          </div>

          <div className="vertical_spacing line" />

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
            <div className="pull-right">${this.state.bookRequest.price} {this.state.bookRequest.currency}</div>
          </div>


          {
            isBookRequestRecepient && !this.state.bookRequest.is_accepted &&
              <div>
                <button
                  onClick={this.onAcceptRequest}
                  className="accept_book_request_btn btn nana_primary_btn"
                  disabled={this.state.isSubmitting}
                  >
                  { this.state.isSubmitting ? "Loading..." : "Accept Booking" }
                </button>
                {
                  isFree &&
                  <p>
                    By clicking accept, you agree to provide photography services to customer for free and fullfill your duties on the agreed upon date.
                  </p>
                }
                {
                  !isFree &&
                  <p>
                    By clicking accept, the customer will be charged with the corresponding payment. You agree to fullfill your duties on the agreed upon date.
                  </p>
                }
              </div>
          }


        </div>
      </div>
    )

  }
}

