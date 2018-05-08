import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditProfileForm from './../components/Account/EditProfileForm'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default class EditProfileScreen extends Component {

  state = {
  }

  componentDidMount() {
  } 

  componentWillUpdate() {
    if (this.state.user && this.state.user.providers.length) {
      this.state.user.providers.map((provider) => {
        Config.setAccessToken(provider)
      })
    }
  }

  initSMSVerification = () => {
    var countryCode = document.getElementById("country_code").value;
    var phoneNumber = document.getElementById("phone_number").value;
    AccountKit.login(
      'PHONE', 
      {countryCode: countryCode, phoneNumber: phoneNumber},
      this.smsVerifyCallback
    )
  }

  smsVerifyCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED" || true) {
      var code = response.code;
      var csrf = response.state;

      // Send code to server to exchange for access token
      ClientAPI.postSMSVerification(csrf, code).then((res) => {
        if (res.body && res.body.error) {
          return alert("failed sms verification")
        } else {

        }
      }).catch((err) => {
        alert("sms verification incomplete.")
      })

    }
    else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
      alert("sms verification failed")
    }
    else if (response.status === "BAD_PARAMS") {
      alert("sms verification bad params")
    }
  }

  hiddenForNow() {
    if (!this.state.user.is_phone_verified) {
      return (
        <div className='phone_verification_container container'>
          <h3>One more step: Phone Verification</h3>
          <input type='hidden' defaultValue="+1" id="country_code" />
          <input type='hidden' placeholder="phone number" id="phone_number"/>
          <br />
          <button className='btn btn-primary' onClick={this.initSMSVerification}>Verify via SMS</button>
        </div>
      ) 
    }
  }

  render() {
    if (!this.props.user) {
      return (
        <Redirect to="/signin"/>
      )
    }

    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`

    return (
      <div className='user_settings_container container-fluid'>
        <div className='user_settings_navigation col-xs-12 col-sm-4 col-md-3 col-lg-2  '>
          <ul>
            <li className="active"><Link to="/account/manage">Edit Profile</Link></li>
            <li ><Link to="/account/verification">Verification</Link></li>
            <li ><Link to="/account/services">My Services</Link></li>
            <li ><Link to="/account/bookings">My Bookings</Link></li>
            <Link to={profileLink} className="view_profile_btn">View Profile</Link>
          </ul>
        </div>
        <div className='user_settings_panel col-xs-12 col-sm-8  col-md-9 col-lg-10 '>
          <EditProfileForm user={this.props.user} onUserUpdated={this.props.onUserUpdated} />
        </div>
      </div>
    )
  }

}
