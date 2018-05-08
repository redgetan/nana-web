import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
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
    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`


    return (
      <div className='user_settings_container container-fluid'>
        <div className='user_settings_navigation col-xs-12 col-sm-4 col-md-3 col-lg-2  '>
          <ul>
            <li ><Link to="/account/manage">Edit Profile</Link></li>
            <li className="active"><Link to="/account/verification">Verification</Link></li>
            <li ><Link to="/account/services">My Services</Link></li>
            <li ><Link to="/account/bookings">My Bookings</Link></li>
            <Link to={profileLink} className="view_profile_btn">View Profile</Link>
          </ul>
        </div>
        <div className='user_settings_panel col-xs-12 col-sm-8  col-md-9 col-lg-10 '>
          <div className='connected_accounts_container'>
            <span className="form_field_description">Claim your unique url by connecting to instagram</span>
            <input type="text" onFocus={this.handleFocus} value={`nanapx.com/${username}`} readOnly="true" />


            <InstagramConnect user={this.props.user} />
          </div>
        </div>
      </div>
    )
  }

}
