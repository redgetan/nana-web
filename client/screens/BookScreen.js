import React, { Component } from 'react'

import Profile from './../components/Profile'

/*
  similar to user
*/

class BookScreen extends Component {

  render() {
    const graphData = this.props.allUsersQuery

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
            <Profile key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}

