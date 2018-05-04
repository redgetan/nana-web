import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditServicesForm from './../components/Account/EditServicesForm'
import UploadPhotosForm from './../components/Account/UploadPhotosForm'
import Wizard from './../components/Widget/Wizard'
import ProfileGalleryPicker from './../components/Photographer/ProfileGalleryPicker'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default class MyServicesScreen extends Component {

  state = {
    initialStep: "service_details"
  }

  componentWillUpdate() {

  }

  steps() {
    return [
      { 
        step: "service_details",
        label: "Service Details",
        component: <EditServicesForm user={this.props.user} />
      },
      { 
        step: "upload_photos",
        label: "Upload Photos",
        component: <UploadPhotosForm user={this.props.user} />
      }
    ]
  }

  render() {
    if (!this.props.user) {
      return (
        <Redirect to="/signin"/>
      )
    }

    return (
      <div className='user_settings_container container'>
        <div className='user_settings_navigation col-xs-12 col-md-3 col-sm-4'>
          <ul>
            <li><Link to="/account/manage">Edit Profile</Link></li>
            <li className="active"><Link to="/account/services">My Services</Link></li>
            <li ><Link to="/account/bookings">My Bookings</Link></li>

            <Link to={`/users/${this.props.user.id}`} className="view_profile_btn">View Profile</Link>
          </ul>
        </div>
        <div className='user_settings_panel col-xs-12 col-md-9 col-sm-8'>
          <Wizard steps={this.steps()} match={this.props.match} currentStep={this.state.initialStep} />
        </div>
      </div>
    )
  }

}
