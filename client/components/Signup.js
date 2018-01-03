import React, { Component } from 'react'
import { AUTHENTICATION_TOKEN } from '../config/config'
import ClientAPI from './../api/client_api'

export default class Signup extends Component {

  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <div>
        <div className=''>
          <input
            className=''
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            placeholder='asdf@gmail.com'
          />
          <br/>
          <input
            className=''
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='password'
          />
          <br/>
        </div>
        <button
          onClick={() => this.performSignup()}
        >
          Submit
        </button>
      </div>
    )
  }

  performSignup = async () => {
    const { email, password } = this.state

    const res = await ClientAPI.signup(email, password)

    if (res.err) {
      if (res.body.error) {
        alert(res.body.error)
      } else {
        alert("Unable to login. try again later")
      }
    } else {
      const token = res.body.authentication_token
      this._postAuth(token)  
    }
  }

  _postAuth(token) {
    this._saveUserData(token)
    this.props.history.push("/")
    renderNavbar(token)
  }

  _saveUserData = (token) => {
    localStorage.setItem(AUTHENTICATION_TOKEN, token)
  }


}
