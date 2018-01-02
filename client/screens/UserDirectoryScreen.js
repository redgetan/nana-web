import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'

class UserDirectoryScreen extends Component {

  render() {
    const graphData = {
      loading: true,
      allUsers: []
    }

    if (graphData) {
      if (graphData.loading) {
        return <div>Loading</div>
      } else if (graphData.error) {
        return <div>Error</div>
      }
    }

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
