import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Config from './../config/config'

export default class EditProfileScreen extends Component {

  state = {
    user: {}
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
      return (
        <div>
          <a href={Config.getInstagramOAuthUrl()} >
            <i className="fa fa-instagram" aria-hidden="true"></i>
            Connect to Instagram
          </a>
        </div>
      )
    } else {
      return (<div>Must show login screen</div>)

    }
  }

}
