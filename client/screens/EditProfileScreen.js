import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import ProfileSummary from './../components/ProfileSummary'
import ProfileGalleryPicker from './../components/ProfileGalleryPicker'
import { Redirect } from 'react-router-dom'


export default class EditProfileScreen extends Component {

  state = {
    user: null,
    unauthorized: false
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

  render() {
    if (this.state.unauthorized) {
      return (
        <Redirect to="/signin"/>
      )
    }

    if (this.state.user) {
      if (this.state.user.providers.length > 0) {
        return (
          <div>
            <ProfileSummary user={this.state.user} />
            <h3>Connected Accounts</h3>
            {
              this.state.user.providers.map((provider) => (
                <div key={provider.name} className="connected_account_label">
                  {provider.name}  
                </div>
              ))
            }
            <ProfileGalleryPicker />
          </div>
        )
      } else {
        return (
          <div>
            <ProfileSummary user={this.state.user} />
            <a href={Config.getInstagramOAuthUrl()} >
              <i className="fa fa-instagram" aria-hidden="true"></i>
              Connect to Instagram
            </a>
          </div>
        )
      }
    } else {
      return (<div></div>)

    }
  }

}
