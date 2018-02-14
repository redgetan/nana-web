import React, { Component } from 'react'
import classNames from 'classnames'
import ProfileCard from './ProfileCard'

import { Link } from 'react-router-dom'

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
      <div className="photographer_directory container">
        <h1>Toronto Photographers</h1>
        <br/>
        {
          this.props.users.map((user) => (
            <div className='user_avatar_container col-xs-6 col-sm-3 col-md-2' key={user.id} >
              <Link to={`/users/${user.id}`} >
                <img className='user_avatar' src={user.avatar} alt=""/>
                <div className="username">{user.username}</div>
              </Link>
            </div>
          ))
        }
      </div>
    )
    
  }
}

