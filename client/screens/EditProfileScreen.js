import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import EditProfileForm from './../components/Account/EditProfileForm'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default class EditProfileScreen extends Component {

  state = {
    user: null,
    unauthorized: false,
    items: [
      { src: "/dist/assets/kimono.jpg"} , 
      { src: "/dist/assets/bike.png" }
    ]
  }

  componentDidMount() {
    ClientAPI.getUserAccount().then((res) => {
      if (res.statusCode === 401) {
        this.setState({ unauthorized: true })
      } else if (res.body.providers) {
        this.setState({ user: res.body })
      } else {
        throw new Error("bad request")
      }
    }).catch((err) => {
      console.log("fail..")
    })
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

  connectToInstagram() {
    if (this.state.user.providers.length > 0) {
      return <a href={Config.getInstagramOAuthUrl()} >
        <i className="fa fa-instagram" aria-hidden="true"></i>
        Connect to Instagram
        {
          this.state.user.providers.map((provider) => (
            <div key={provider.name} className="connected_account_label">
              {provider.name}  
            </div>
          ))
        }
      </a>
    }
  }

  render() {
    if (this.state.unauthorized) {
      return (
        <Redirect to="/signin"/>
      )
    }

    if (this.state.user) {
      return (
        <div className='user_settings_container container'>
          <div className='user_settings_navigation col-xs-12 col-sm-12 '>
            <ul>
              <li className="active"><Link to="/account/manage">Edit Profile</Link></li>
              <li ><Link to="/account/manage/photos">Manage Photos</Link></li>
            </ul>
          </div>
          <div className='user_settings_panel col-xs-12 col-sm-12 '>
            <EditProfileForm user={this.state.user} />
          </div>
        </div>
      )
    } else {
      return (<div></div>)

    }
  }

}
