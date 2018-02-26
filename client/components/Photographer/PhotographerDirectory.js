import React, { Component } from 'react'
import classNames from 'classnames'
import ProfileCard from './ProfileCard'

import { Link } from 'react-router-dom'

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const capitalizeWords = (text) => {
  return text.replace(/\b\w/g, l => l.toUpperCase())
}

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

    let contents = []
    let usersByLocation = groupBy(this.props.users, "location")

    for (let location in usersByLocation) {
      contents.push(
        <div>
          <h1>{capitalizeWords(location)} Photographers</h1>
          <br/>
        </div>
      )

      usersByLocation[location].map((user) => {
        contents.push(
          <div className='user_avatar_container col-xs-6 col-sm-3 col-md-2' key={user.id} >
            <Link to={`/users/${user.id}`} >
              <img className='user_avatar' src={user.avatar} alt=""/>
              <div className="username">{user.username}</div>
            </Link>
          </div>
        )
      })
    }

    return (
      <div className="photographer_directory container">
        {
          contents
        }
      </div>
    )
    
  }
}

