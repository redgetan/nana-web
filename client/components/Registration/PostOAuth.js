import React, { Component } from 'react'
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'

export default class PostOAuth extends Component {

  render() {
    return (
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
    )
  }

  componentDidMount() {
    ClientAPI.signinViaHttpCookie().then((res) => {
      if (res.body && res.body.error) {
        this.setState({ error: "Cant login. something went wrong" })
      } else {
        postAuth(res.body, this.props)  
      }
    }).catch((err) => {
      this.setState({ error: "Unable to login. Try again later" })
    })
  }

  componentWillUnmount() {
  }
  
}

const postAuth = (data, props) => {
  Config.setUserData(data)

  data.providers.forEach((provider) => {
    Config.setAccessToken(provider)
  })

  props.onUserAuthenticated(data)
  props.history.push("/account/manage")

  renderNavbar()
}
