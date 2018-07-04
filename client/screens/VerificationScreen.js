import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import FlashMessage from './../components/Widget/FlashMessage'
import AccountNavigationTab from './../components/Account/AccountNavigationTab'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

function InstagramConnect(props) {
  const {className, style, onClick} = props

  return (
    <div className='instagram_connect_container'>
      {
        props.user.providers.length === 0 &&
          <a href={Config.getInstagramOAuthUrl()} className="instagram_login_btn" >
            <i className="fa fa-instagram" aria-hidden="true"></i> Connect to Instagram
          </a>
      }
      {
        props.user.providers.length > 0 && props.user.providers.map((provider) => (
          <div key={provider.name} className="connected_account_label">
            {provider.name} connected
          </div>
        ))
      }
    </div>
  )
}



export default class VerificationScreen extends Component {

  state = {
  }

  componentDidMount() {
  } 

  componentWillUpdate() {

  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    if (!this.props.user) {
      return (
        <Redirect to="/signin"/>
      )
    }

    const username = this.props.user.username ? this.props.user.username : "username"

    const params = new URLSearchParams(this.props.location.search)
    const isSuccess = params.get('success')
    const status = isSuccess ? { success: "Your instagram account has now been connected" } : {}

    return (
      <div className='user_settings_container container-fluid'>
        <AccountNavigationTab user={this.props.user} location={this.props.location} />
        <div className='user_settings_panel col-xs-12 col-sm-8  col-md-9 col-lg-10 '>
          <div className='connected_accounts_container'>
            <FlashMessage status={status} />
            <span className="form_field_description">Claim your unique url by following our instagram account <a href="https://www.instagram.com/getnanapx/"> @getnanapx</a> and sending us a DM</span>
            <input type="text" onFocus={this.handleFocus} value={`nanapx.com/${username}`} readOnly="true" />
          </div>
        </div>
      </div>
    )
  }

}
