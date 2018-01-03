import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'

export default class UserDirectoryScreen extends Component {

  componentDidMount() {
  } 

  render() {
    const graphData = []

    return (
      <div>
        {
          graphData.map((user) => (
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}
