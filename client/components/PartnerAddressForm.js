import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class PartnerAddressForm extends Component {
  isValidated() {
    return true
  }

  render() {
    return (
      <div>
        <h1>order details</h1>
        <ul className="service_summary_container">
          <li><span className="session_price">$45</span> per person</li>
          <li>1 hour Experience</li>
          <li>by: {this.props.user.email}</li>
        </ul>
      </div>
    );
  }
}