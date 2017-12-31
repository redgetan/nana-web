import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ProfileCard from './../components/ProfileCard'

class UserDirectoryScreen extends Component {

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
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}

const ALL_LINKS_QUERY = gql`
  # 2
  query AllUsersQuery {
    allUsers {
      id
      createdAt
      username
      description
      imageUrl
    }
  }
`

// 3
export default graphql(ALL_LINKS_QUERY, { name: 'allUsersQuery' }) (UserDirectoryScreen)
