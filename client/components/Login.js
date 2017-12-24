import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../config/config'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {

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
            onClick={() => this._confirm()}
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

  _confirm = () => {
    const { username, email, password } = this.state
    let authPromise = null
    if (this.state.login) {
      authPromise = this.props.authenticateUserMutation({
        variables: {
          email,
          password
        }
      })
    } else {
      authPromise = this.props.signupUserMutation({
        variables: {
          email,
          password,
          username
        }
      })
    }

    return authPromise.then((result) => {
      const { id, token } = result.data.authenticateUser
      this._postAuth(id, token)
    }).catch((e) => {
      const msg = e.graphQLErrors.map((err) => { return err.functionError }).join(". ")
      alert(msg)
    })
  }

  _postAuth(id, token) {
    this._saveUserData(id, token)
    this.props.history.push("/")
    renderNavbar()
  }

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation($email: String!, $password: String!, $username: String!) {
    signupUser(
      email: $email,
      password: $password,
      username: $username
    ) {
      id
      token
    }
  }
`

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(
      email: $email,
      password: $password
    ) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)