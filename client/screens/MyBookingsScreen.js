import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditServicesForm from './../components/Account/EditServicesForm'
import UploadPhotosForm from './../components/Account/UploadPhotosForm'
import AccountNavigationTab from './../components/Account/AccountNavigationTab'
import PublishServicesForm from './../components/Account/PublishServicesForm'
import Wizard from './../components/Widget/Wizard'
import ProfileGalleryPicker from './../components/Photographer/ProfileGalleryPicker'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

const BookRequestTable = (props) => {
  const {className, style, onClick} = props

  return (
    <table className="table table-hover my_bookings_table">
      <thead>
        <tr>
          <th>Photoshoot Date</th>
          <th>Location</th>
          <th>Duration</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
          props.book_requests.map((book_request, index) => (
            <tr onClick={props.onRowClick} data-token={book_request.token} key={index}>
              <td className='col-xs-2'>{moment(book_request.start_time).format('LL')}</td>
              <td className='col-xs-7'>{book_request.location}</td>
              <td className='col-xs-1'>{book_request.duration} hours</td>
              <td className='col-xs-1'>{book_request.price}</td>
              <td className='col-xs-1'>{book_request.is_accepted ? "accepted" : "pending" }</td>
            </tr>  
          ))
        }
      </tbody>
    </table>
  )
}

export default class MyServicesScreen extends Component {

  state = {
    bookRequestMap: null
  }

  componentWillUpdate() {

  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    ClientAPI.listBookings().then((res) => {
      const bookRequestMap = res.body
      this.setState({ bookRequestMap: bookRequestMap })
    })
  } 

  onRowClick = (event) => {
    const token = $(event.target).closest("tr").data('token')
    this.props.history.push("/book_requests/" + token)  
  }

  render() {
    if (!this.props.user) {
      return (
        <Redirect to="/signin"/>
      )
    }

    return (
      <div className='user_settings_container container-fluid'>
        <AccountNavigationTab user={this.props.user} location={this.props.location} />
        <div className='user_settings_panel col-xs-12 col-md-9 col-sm-8'>
          <h2>My Bookings</h2>

          <div className='book_requests_container'>
            <h4>Sent</h4>
            {
              !this.state.bookRequestMap &&
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
            }
            {
              this.state.bookRequestMap && this.state.bookRequestMap.sent.length === 0 &&
                <div className="empty_state">
                  No bookings yet
                </div>
            }
            {
              this.state.bookRequestMap && this.state.bookRequestMap.sent.length > 0 &&
                <BookRequestTable book_requests={this.state.bookRequestMap.sent} onRowClick={this.onRowClick} />
            }
          </div>

          <div className='book_requests_container'>
            <h4>Received</h4>
            {
              !this.state.bookRequestMap &&
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
            }
            {
              this.state.bookRequestMap && this.state.bookRequestMap.received.length === 0 &&
                <div className="empty_state">
                  No bookings yet
                </div>
            }
            {
              this.state.bookRequestMap && this.state.bookRequestMap.received.length > 0 &&
                <BookRequestTable book_requests={this.state.bookRequestMap.received} onRowClick={this.onRowClick} />
            }
          </div>


        </div>

      </div>
    )
  }

}
