import React, { Component } from 'react'

import { withFormik, Formik, Field } from 'formik'

import FormField from "./../Widget/FormField"
import FlashMessage from "./../Widget/FlashMessage"
import FormTextArea from "./../Widget/FormTextArea"
import SelectField from "./../Widget/SelectField"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'
import FormConfig from '../../config/form_config'
import { Link } from 'react-router-dom'
import Switch from 'react-ios-switch';


export default class PublishServicesForm extends Component {

  state = {

  }

  onPublishClick = () => {
    ClientAPI.toggleServices(this.props.user.id, true).then((res) => {
      const user = res.body
      Config.setUserData(user)
      this.props.onUserUpdated(user)
    })
  }

  onUnpublishClick = () => {
    ClientAPI.toggleServices(this.props.user.id, false).then((res) => {
      const user = res.body
      Config.setUserData(user)
      this.props.onUserUpdated(user)
    })
  }

  onSubmitApplication = () => {
    ClientAPI.completeServicesStep(this.props.user.id, "submit").then((res) => {
      const user = res.body

      Config.setUserData(user)
      this.props.onUserUpdated(user)
    })

  }

  onServicesEnabledChanged = (isChecked) => {
    if (isChecked) {
      this.onPublishClick()
    } else {
      this.onUnpublishClick()
    }
  }

  render() {
    const isChecked = this.props.user.is_photographer 
    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`

    const currentStep = this.props.user.my_services_step

    let component = <div></div>
    if (currentStep === "approved") {
      component = <div className="services_toggle_container">
        <span>Enable Services </span>
        <Switch className="servies_toggle_btn" checked={isChecked} onChange={this.onServicesEnabledChanged}  onColor="#c70e92" />
      </div>
    } else if (currentStep === "submitted") {
      component = <div className="">
        <p>Your application has been submitted. Once approved, your profile page would be changed into a photographer profile that can accept bookings from users.</p>
      </div>
    } else {
      component = <div className="">
        <p>The approval should take less than a couple of days. We're looking for the right kind of photographers, and want to control quality initially as we undergo our beta testing. </p>
        <p>Once you're approved, you'll receive an email notification with a link to your updated photographer profile. </p>
        <br/> 
        <button className='nana_btn' onClick={this.onSubmitApplication}>Submit</button>
        <br/> 
      </div>
    }

    return component
  }
}

