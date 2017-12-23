import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Signup extends Component {

  state = {
    username: '',
    description: '',
    imageUrl: ''
  }

  render() {
    return (
      <div>
        <div className=''>
          <input
            className=''
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            type='text'
            placeholder='username'
          />
          <br/>
          <input
            className=''
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='a short bio'
          />
          <br/>
          <input
            className=''
            value={this.state.imageUrl}
            onChange={(e) => this.setState({ imageUrl: e.target.value })}
            type='text'
            placeholder='url of image'
          />
        </div>
        <button
          onClick={() => this._doSignup()}
        >
          Submit
        </button>
      </div>
    )
  }

  _doSignup = async () => {
    const { username, description, imageUrl } = this.state
    await this.props.createUserMutation({
      variables: {
        username,
        description,
        imageUrl
      }
    })

    this.props.history.push(`/`)
  }

}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($username: String!, $description: String!, $imageUrl: String!) {
    createUser(
      username: $username,
      description: $description,
      imageUrl: $imageUrl,
    ) {
      id
      createdAt
      username
      description
      imageUrl
    }
  }
`

// 3
export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(Signup)
