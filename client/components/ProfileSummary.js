import React, { Component } from 'react'

export default class ProfileSummary extends Component {

  render() {
    return (
      <div className='profile_summary'>
        <div className="user_email">{this.props.user.email}</div>
        <div className="user_avatar">
          <img src={this.props.user.avatar} alt=""/>
        </div>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
}
