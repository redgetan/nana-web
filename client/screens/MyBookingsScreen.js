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

export default class MyServicesScreen extends Component {

  state = {
    book_requests: []
  }

  componentWillUpdate() {

  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    ClientAPI.listBookings().then((res) => {
      if (Array.isArray(res.body)) {
        const book_requests = res.body
        this.setState({ book_requests: book_requests })
      } else {
        console.log("failed to list bookings..")
      }
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
          <div className=''>
            {
              this.state.book_requests.length === 0 &&
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
            }
            {
              this.state.book_requests.length > 0 &&
                <table className="table table-hover my_bookings_table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.book_requests.map((book_request, index) => (
                        <tr onClick={this.onRowClick} data-token={book_request.token} key={index}>
                          <td className='col-xs-1'>{moment(book_request.start_time).format('LL')}</td>
                          <td className='col-xs-8'>{book_request.location}</td>
                          <td className='col-xs-1'>{book_request.duration} hours</td>
                          <td className='col-xs-1'>{book_request.price}</td>
                          <td className='col-xs-1'>{book_request.is_accepted ? "accepted" : "pending" }</td>
                        </tr>  
                      ))
                    }
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>
    )
  }

}
