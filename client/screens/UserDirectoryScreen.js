import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'
import ClientAPI from './../api/client_api'


export default class UserDirectoryScreen extends Component {

  state = {
    users: []
  }


  async componentDidMount() {
    const res = await ClientAPI.listUsers()

    this.setState({ users: res.body })

  } 

  render() {
    const graphData = []

    return (
      <div>
        {
          this.state.users.map((user) => (
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}
