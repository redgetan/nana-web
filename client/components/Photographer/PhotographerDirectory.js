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
        <div key={location}>
          <h3>{capitalizeWords(location)}</h3>
          <br/>
        </div>
      )

      usersByLocation[location].map((user) => {
        contents.push(
          <div className='directory_row row' key={user.id} >
              <div className='row'>
                <div className="directory_item_col">
                  <img className='user_avatar' src={user.avatar} alt=""/>
                </div>
                <div className="directory_item_col">
                  <div className="username">{user.username}</div>
                </div>
                <div className="directory_item_col">
                  <Link to={`/users/${user.id}`} className='btn primary-btn' >
                    Buy @ $99
                  </Link>
                </div>
              </div>

              <div className='row photo_gallery_thumbnails'>
                {
                  user.photos.map((photo, index) => (
                    <img key={index} className="directory_photo_gallery_thumbnail" src={photo.src} />
                  ))
                }
              </div>
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

