import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ClientAPI from './../api/client_api'
import Config from './../config/config'
import FlashMessage from './../components/Widget/FlashMessage'

export default class ResetPasswordScreen extends Component {

  state = {
    password: "", 
    password_confirmation: "", 
    status: {},
    reset_successful: false
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const token = this.props.match.params.token

    return ClientAPI.checkResetPasswordTokenValidity(token).then((result) => {
      this.setState({ expired: result.body.expired })
    })
  }

  performPasswordReset = (event) => {
    event.preventDefault()

    const token = this.props.match.params.token

    return ClientAPI.resetPassword(token, { 
      password: this.state.password, 
      password_confirmation: this.state.password_confirmation 
    }).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ status: { error: res.body.error }})
      } else {
        this.setState({ reset_successful: true })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handlePasswordConfirmationChange = (event) => {
    this.setState({ password_confirmation: event.target.value })
  }

  render() {
    if (this.state.expired) return <Redirect to="/forgot_password?expired=true"/>

    if (this.state.reset_successful) return (
      <div className="container">
        <div className='password_reset_success_container '>
          <div className='alert alert-success'>
            Password successfully changed. Click <Link to="/signin">here</Link> to signin
          </div>
        </div>
      </div> 
    )

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <form className='col-xs-12 forgot_password_container' onSubmit={this.performPasswordReset} >
              <FlashMessage status={this.state.status} clearStatus={() => { this.setState({ status: {} }) }} />
              <h3>Reset Password</h3>
              <label>Password</label><br/>
              <input type='password' value={this.state.password} onChange={this.handlePasswordChange}  /><br/>
              <label>Confirm Password</label><br/>
              <input type='password' value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange}  /><br/>
              <input type='submit' className='btn nana_btn reset_password_btn' value="Reset Password" />
            </form>
          </div>
        </div>
      </div>
    )

  }
}

