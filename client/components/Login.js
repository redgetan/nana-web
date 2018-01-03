import React, { Component } from 'react'
import { AUTHENTICATION_TOKEN } from '../config/config'
import ClientAPI from './../api/client_api'

export default class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    username: ''
  }

  render() {

    return (
      <div>
        <h4 className='mv3'>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div className='flex flex-column'>
          {!this.state.login &&
          <input
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            type='text'
            placeholder='Your username'
          />}
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='btn btn-primary'
            onClick={() => this.performLogin()}
          >
            {this.state.login ? 'login' : 'create account' }
          </div>
          <div
            className='btn'
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  performLogin = async () => {
    const { username, email, password } = this.state

    const res = await ClientAPI.signin(email, password)

    if (res.err) {
      if (res.body && res.body.error) {
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

