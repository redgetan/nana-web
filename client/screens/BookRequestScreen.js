import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import { Link } from 'react-router-dom'

export default class BookRequestScreen extends Component {

  state = {
    bookRequest: null,
    notFound: false
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

    // user details
    // name, email, avatar, photoshoot location

    const profileLink = "/" + this.state.bookRequest.photographer.username
    const photographerName = this.state.bookRequest.photographer.username

    return (
      <div>
        <div className="container book_request_container">
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

          <div className="price_total_row block">
            <div className="price_total_label pull-left">Total</div> 
            <div className="pull-right">${this.state.bookRequest.price}</div> 
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-3"><label>Name</label></div>
            <div className="col-xs-12 col-sm-9">{this.state.bookRequest.user.name}</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-3"><label>Email</label></div>
            <div className="col-xs-12 col-sm-9">{this.state.bookRequest.user.email}</div>
          </div>

          <button onClick={this.onAcceptRequest} className="accept_book_request_btn nana_primary_btn">Accept Booking</button>

        </div>
      </div>
    )

  }
}

