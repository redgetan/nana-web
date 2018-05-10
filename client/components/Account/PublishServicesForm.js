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

  render() {
    const actionButton = this.props.user.is_photographer ? (
      <button className='nana_btn unpublish_service_btn' onClick={this.onUnpublishClick}>Unpublish</button>        
    ) : (
      <button className='nana_btn publish_service_btn' onClick={this.onPublishClick}>Publish</button>        
    )

    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`
    const previewLink = this.props.user.is_photographer ? profileLink : `/users/${this.props.user.id}/preview_service`

    return (
      <div className="">
        {actionButton}
        <Link className='' target="_blank" to={previewLink}>Preview</Link>        
      </div>
    )  
  }
}

