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
    initialStep: "details"
  }

  componentWillUpdate() {

  }

  constructor(props) {
    super(props)
    
    this.stepRefs = {}

  }

  steps(currentStep) {
    let steps = [
      { 
        step: "upload_photos",
        label: "Upload Photos",
        component: <UploadPhotosForm ref={el => (this.stepRefs["upload_photos"] = el)} user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
      },
      { 
        step: "details",
        label: "Details",
        component: <EditServicesForm ref={el => (this.stepRefs["details"] = el)} user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
      },
      {
        step: "submit",
        label: "Submit",
        component: <PublishServicesForm ref={el => (this.stepRefs["submit"] = el)} user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
      }
    ]

    return steps
  }


  applyAsPhotographer = () => {
    ClientAPI.applyAsPhotographer(Config.getCurrentUser().id).then((res) => {
      const user = res.body
      Config.setUserData(user)
      this.props.onUserUpdated(user)
    })
  }

  componentDidMount() {
    ClientAPI.getCurrentStep().then((res) => {
      const currentStep = res.body

      const isCurrentStepChanged = currentStep !== this.props.user.my_services_step
      if (isCurrentStepChanged) {
        let user = this.props.user
        user.my_services_step = currentStep
        
        Config.setUserData(user) 
        this.props.onUserUpdated(user)
      }

    })
  } 

  render() {
    if (!this.props.user) {
      return (
        <Redirect to={`/signin?redirect=${window.location.href}`}/>
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
      content = <Wizard steps={this.steps(this.props.user.my_services_step)} stepRefs={this.stepRefs} match={this.props.match} currentStep={this.props.user.my_services_step} />
    }

    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`
    const servicesLabel = this.props.user.my_services_step === "approved" ? "My Services" : "Apply as Photographer"

    return (
      <div className='user_settings_container container-fluid'>
        <AccountNavigationTab user={this.props.user} location={this.props.location} />
        <div className='user_settings_panel col-xs-12 col-md-9 col-sm-8'>
          {content} 
        </div>
      </div>
    )
  }

}
