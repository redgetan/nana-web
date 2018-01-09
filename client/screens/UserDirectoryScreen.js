import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'
import ClientAPI from './../api/client_api'


export default class UserDirectoryScreen extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    ClientAPI.listUsers().then((res) => {
      if (Array.isArray(res.body)) {
        const users = res.body
        const sortedUsers = users.sort((a, b) => { return (new Date(b.created_at)) - (new Date(a.created_at)) })
        this.setState({ users: sortedUsers })
      } else {
        throw new Error("failed to list users")
      }
    }).catch((err) => {
      alert(err.message)
    })
  } 

  render() {
    const graphData = []

    return (
      <div>
        {
          this.state.users
                    .map((user) => (
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}
