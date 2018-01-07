import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ProfileCard extends Component {

  render() {
    return (
      <div className='photographer_card'>
        <div className="username">{this.props.user.email}</div>
        <Link to={`/${this.props.user.id}`}>
          <img className='user_photo_gallery_item' src={this.props.user.avatar} alt=""/>
        </Link>
        <ul className="service_summary_container">
          <li><span className="session_price">$45</span> per person</li>
        </ul>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
}
