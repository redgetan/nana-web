import React, { Component } from 'react'
import Config from '../../config/config'
import ClientAPI from './../../api/client_api'
import { Link } from 'react-router-dom'

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    username: ''
  }

  render() {

    return (
      <div>
        <form className='' onSubmit={this.performLogin}>
          <h4 className='mv3'>Login</h4>
          <div className='flex flex-column'>
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
              placeholder='password'
            />
          </div>
          <div className='flex mt3'>
            <input type='submit' className='btn btn-primary' value="Login" />
            
            <Link to="/signup">
              Register an account
            </Link>
          </div>
        </form>
      </div>
    )
  }

  performLogin = (event) => {
    event.preventDefault()

    const { username, email, password } = this.state

    ClientAPI.signin(email, password).then((res) => {
      if (res.body && res.body.error) {
        alert(res.body.error)
      } else {
        this._postAuth(res.body)  
      }
    }).catch((err) => {
      alert("Unable to login. try again later")
    })

  }

  _postAuth(data) {
    this._saveUserData(data)

    data.providers.forEach((provider) => {
      Config.setAccessToken(provider)
    })

    this.props.history.push("/account/manage")
    renderNavbar()
  }

  _saveUserData = (data) => {
    Config.setUserData(data)
  }

}
