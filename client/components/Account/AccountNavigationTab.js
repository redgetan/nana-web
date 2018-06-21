import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AccountNavigationTab extends Component {

  componentDidMount() {

  }

  render() {
    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`
    const servicesLabel = this.props.user.my_services_step === "approved" ? "My Services" : "Apply as Photographer"

    switch(this.props.location.pathname) {
      case "/account/bookings":
    }

    return (
      <div className='user_settings_navigation col-xs-12 col-sm-4 col-md-3 col-lg-2  '>
        <ul>
          <li className={this.props.location.pathname === "/account/manage" ? "active": ""}><Link to="/account/manage">Profile</Link></li>
          <li className={this.props.location.pathname === "/account/verification" ? "active": ""}><Link to="/account/verification">Verification</Link></li>
          <li className={this.props.location.pathname === "/account/bookings" ? "active": ""}><Link to="/account/bookings">My Bookings</Link></li>
          <li className={this.props.location.pathname === "/account/services" ? "active": ""}><Link to="/account/services">{servicesLabel}</Link></li>
          <Link to={profileLink} className="view_profile_btn">View Profile</Link>
        </ul>
      </div>
    )
  }
}
