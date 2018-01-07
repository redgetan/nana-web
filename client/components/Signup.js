import React, { Component } from 'react'
import Config from '../config/config'
import ClientAPI from './../api/client_api'

export default class Signup extends Component {

  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <div>
        <form className='' onSubmit={this.performSignup}>
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
          <input type="submit" value="Sign Up"/>
        </form>
      </div>
    )
  }

  performSignup = (event) => {
    event.preventDefault()

    const { email, password } = this.state

    ClientAPI.signup(email, password).then((res) => {
      if (res.err) {
        alert(res.body.error)
      } else {
        this._postAuth(res.body)  
      }
    }).catch((err) => {
      alert(err.message)
    })
  }

  _postAuth(data) {
    this._saveUserData(data)
    this.props.history.push("/")
    renderNavbar()
  }

  _saveUserData = (data) => {
    Config.setUserData(data)
  }


}
