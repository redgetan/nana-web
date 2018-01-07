import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'

export default class EditProfileScreen extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    ClientAPI.getUserAccount().then((res) => {
      this.setState({ user: res.body })
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  render() {
    if (this.state.user) {
      if (this.state.user.providers.length > 0) {
        return (
          <div>
            <h3>Connected Accounts</h3>
            {
              this.state.user.providers.map((provider) => (
                <div key={provider} className="connected_account_label">
                  {provider}  
                </div>
              ))
            }
          </div>
        )
      } else {
        return (
          <div>
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
