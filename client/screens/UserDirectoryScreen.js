import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'
import ClientAPI from './../api/client_api'

export default class UserDirectoryScreen extends Component {

  componentDidMount() {
    ClientAPI.signin(email, password).then((response) => {
      console.log("response")
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  } 

  render() {
    const graphData = []

    return (
      <div>
        {
          graphData.allUsers.map((user) => (
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}
