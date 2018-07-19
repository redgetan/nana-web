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
      if (this.props.loading) {
        return (
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
        )
      } else {
        return (
          <div className="photographer_directory container">
            <h3 className='center'>No Photographers found in {this.props.address}</h3>
            <br/>
            <br/>

          </div>
        )
      }
    }

    let contents = []
    let usersByLocation = groupBy(this.props.users, "location")

    for (let location in usersByLocation) {
      contents.push(
        <div key={location}>
          <h3 className='search_result_header'>Photographers in {location}</h3>
          <br/>
        </div>
      )

      usersByLocation[location].forEach((user) => {
        let user_id = user.username ? user.username : user.id

        contents.push(
          <div className='directory_card col-xs-12 col-sm-6 col-md-4 col-lg-3' key={user_id} >
            <div className='directory_item_row'>
              <Link to={`/users/${user_id}`}>
                <div className="directory_item_col">
                  <img className='user_avatar' src={user.avatar} alt=""/>
                </div>
                <div className="directory_item_col">
                  <div className="username">{user.username || user.first_name}</div>
                </div>
              </Link>
            </div>
            <div className='directory_item_row photographer_directory_bio'>
              {user.bio}
            </div>
            <div className='directory_item_row'>
              <ProfileCard user={user} />
            </div>
            <Link to={`/users/${user_id}`} className='view_full_profile_btn'>
              View Full Profile
            </Link>
            <Link to={`/users/${user_id}/book`} className='book_request_btn btn secondary_action_btn pull-right' >
              Request to Book
            </Link>

          </div>
        )
      })
    }

    return (
      <div className="photographer_directory container">
        <div className="row">
          {
            contents
          }
        </div>
      </div>
    )

  }
}

