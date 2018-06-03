import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import moment from 'moment'


export default class PriceSummary extends Component {
  render() {
    const totalPrice = this.props.user.price * this.props.duration
    const photographerName = this.props.user.username ? this.props.user.username : [this.props.user.first_name, this.state.props.last_name].join(" ")
    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`

    return (
      <div className="price_summary_container">
        <div className='photographer block'>
          Photoshoot with <Link to={profileLink} >{photographerName}</Link>
          <img src={this.props.user.avatar} className='user_avatar' />
        </div>

        <div className="vertical_spacing line" />

        {
          this.props.start_date && 
            <div className="service_date_row block">
              <div className="service_date">{moment(this.props.start_date).format("LL")}</div>
              <div className="service_time_range">18:00 − 22:00</div>
              <div className="service_location">{this.props.location && this.props.location}</div>
              <div className="vertical_spacing line" />
            </div>

        }

        <div className="price_subtotal_row block">
          <div className="pull-left">${this.props.user.price} x {this.props.duration} hours</div> 
          <div className="pull-right">{totalPrice}</div> 
        </div>

        <div className="vertical_spacing line" />

        <div className="price_total_row block">
          <div className="price_total_label pull-left">Total</div> 
          <div className="pull-right">${totalPrice}</div> 
        </div>

        <button disabled={this.props.disabled} onClick={this.props.onProceedPayment} className="proceed_payment_btn btn btn-lg btn-success">Proceed to Payment</button>
        
      </div>
    )
  }
}