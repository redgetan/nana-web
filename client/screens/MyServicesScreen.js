import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditServicesForm from './../components/Account/EditServicesForm'
import UploadPhotosForm from './../components/Account/UploadPhotosForm'
import PublishServicesForm from './../components/Account/PublishServicesForm'
import Wizard from './../components/Widget/Wizard'
import ProfileGalleryPicker from './../components/Photographer/ProfileGalleryPicker'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default class MyServicesScreen extends Component {

  state = {
    initialStep: "details"
  }

  componentWillUpdate() {

  }

  constructor(props) {
    super(props)
    
    this.stepRefs = {}

  }

  steps() {
    return [
      { 
        step: "details",
        label: "Details",
        component: <EditServicesForm ref={el => (this.stepRefs["details"] = el)} user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
      },
      { 
        step: "upload_photos",
        label: "Upload Photos",
        component: <UploadPhotosForm ref={el => (this.stepRefs["upload_photos"] = el)} user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
      },
      { 
        step: "publish",
        label: "Publish",
        component: <PublishServicesForm ref={el => (this.stepRefs["publish"] = el)} user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
      }
    ]
  }


  applyAsPhotographer = () => {
    ClientAPI.applyAsPhotographer(Config.getCurrentUser().id).then((res) => {
      const user = res.body
      Config.setUserData(user)
      this.props.onUserUpdated(user)
    })
  }


  render() {
    if (!this.props.user) {
      return (
        <Redirect to="/signin"/>
      )
    }

    let content

    if (this.props.user.my_services_step === "initial") {
      content = (
        <div className="apply_photographer_description">
          <h2>Become a Social Media Photographer</h2>
          <p>A lot of people struggle with having good social media content, and as a result, they miss out on the benefits of being able to expand their network, establish new friendships, and meet romantic partners. </p>
          <p>They need the help of photographers who can make them feel comfortable in their own skin. If you find the prospect of helping people have fun, authentic photos that push forward their brand, relationship, or business, and if you're ready to make an impact in people's lives through photography, then jump on board and apply. </p>

          <button className="nana_btn btn btn-primary" onClick={this.applyAsPhotographer}>Start</button>
        </div>
      )
    } else {
      content = <Wizard steps={this.steps()} stepRefs={this.stepRefs} match={this.props.match} currentStep={this.props.user.my_services_step} />
    }

    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`

    return (
      <div className='user_settings_container container-fluid'>
        <div className='user_settings_navigation col-xs-12 col-md-3 col-sm-4'>
          <ul>
            <li><Link to="/account/manage">Edit Profile</Link></li>
            <li ><Link to="/account/verification">Verification</Link></li>
            <li className="active"><Link to="/account/services">My Services</Link></li>

            <Link to={profileLink} className="view_profile_btn">View Profile</Link>
          </ul>
        </div>
        <div className='user_settings_panel col-xs-12 col-md-9 col-sm-8'>
          {content} 
        </div>
      </div>
    )
  }

}
