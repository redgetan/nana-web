import React, { Component } from 'react'
import classNames from 'classnames'
import ProfileCard from './ProfileCard'

export default class PhotographerDirectory extends Component {
  render() {
    if (this.props.users.length === 0) {
      return (
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
      )
    } 

    return (
      <div className="photographer_directory container-fluid">
        {
          this.props.users.map((user) => (
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
    
  }
}

