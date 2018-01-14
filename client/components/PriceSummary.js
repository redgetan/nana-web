import React, { Component } from 'react'
import classNames from 'classnames'


export default class PriceSummary extends Component {
  render() {
    return (
      <div className="price_summary_container">
        <div className="header_2">Summary</div>

        <div className="service_date_row">
          <div className="service_date">Jan 15 2018 (Monday)</div>
          <div className="service_time_range">18:00 − 22:00</div>
        </div>

        <div className="price_subtotal_row">
          <div className="pull-left">${this.props.basePrice} x {this.props.guests.length} guest</div> 
          <div className="pull-right">{this.props.basePrice * this.props.guests.length}</div> 
        </div>

        <div className="price_total_row">
          <div className="pull-left">Total</div> 
          <div className="pull-right">{4}</div> 
        </div>
      </div>
    )
  }
}