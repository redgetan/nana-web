import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import FlashMessage from './../components/Widget/FlashMessage'


export default class ForgotPasswordScreen extends Component {

  state = {
    email: "", 
    status: {}
  }

  constructor(props) {
    super(props)
  }

  isEmailValid(email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return false
    } else {
      return true
    }
  }

  sendPasswordResetEmail = (event) => {
    event.preventDefault()
    console.log("sendPasswordResetEmail..")

    const email = this.state.email

    if (!this.isEmailValid(email)) return this.setState({ status: { error: "Invalid email" }})

    return ClientAPI.sendPasswordResetEmail({ email: this.state.email }).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ status: { error: res.body.error }})
      } else {
        this.setState({ status: { success: res.body } })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  handleChange = (event) => {
    this.setState({ email: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <form className='col-xs-12 forgot_password_container' onSubmit={this.sendPasswordResetEmail} >
              <FlashMessage status={this.state.status} clearStatus={() => { this.setState({ status: {} }) }} />
              <h3>Forgot Password</h3>
              <label>Email</label><br/>
              <input type='text' value={this.state.email} onChange={this.handleChange}  /><br/>
              <input type='submit' className='btn nana_btn' value="Reset Password" />
            </form>
          </div>
        </div>
      </div>
    )

  }
}

