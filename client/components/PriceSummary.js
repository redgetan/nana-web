import React, { Component } from 'react'
import classNames from 'classnames'


export default class PriceSummary extends Component {
  render() {
    return (
      <div className="price_summary_container block">
        <div className="header_2">Summary</div>

        <div className="service_date_row block">
          <div className="service_date">Jan 15 2018 (Monday)</div>
          <div className="service_time_range">18:00 − 22:00</div>
        </div>

        <div className="vertical_spacing line" />

        <div className="price_subtotal_row block">
          <div className="pull-left">${this.props.basePrice} x {this.props.guests.length} guest</div> 
          <div className="pull-right">{this.props.basePrice * this.props.guests.length}</div> 
        </div>

        <div className="vertical_spacing line" />

        <div className="price_total_row block">
          <div className="price_total_label pull-left">Total</div> 
          <div className="pull-right">${4}</div> 
        </div>

        {
          this.props.currentStep === "order_details" && 
            <button onClick={this.props.nextHandler} className="proceed_payment_btn btn btn-lg btn-success">Proceed to Payment</button>
        }
        
      </div>
    )
  }
}