import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Elements } from 'react-stripe-elements';
import Config from './../../config/config';


import InjectedCheckoutForm from './CheckoutForm';

export default class PriceSummary extends Component {
  state = {
    checkout: false
  }

  componentDidMount() {
    this.initStripe()
  }

  onProceedPayment = () => {
    window.scrollTo(0, 0)
    this.setState({ checkout: true }) 
    this.props.onProceedPayment()

    this.addPaymentMethod()
  }

  onConfirmOrder = (stripeCustomerId) => {
    this.props.onConfirmOrder(stripeCustomerId)
  }

  addPaymentMethod = () => {
    this.stripeHandler.open({
      name: 'Nanapx',
      email: this.props.customerEmail,
      zipCode: true,
      panelLabel: "Confirm Order"
    })
  }

  initStripe() {
    this.stripeHandler = StripeCheckout.configure({
      key: Config.getStripePublicKey(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        console.log(token)
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    })

  }


  render() {
    const totalPrice = this.props.user.price * this.props.duration
    const photographerName = this.props.user.username ? this.props.user.username : [this.props.user.first_name, this.props.user.last_name].join(" ")
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

        {
          !this.state.checkout &&
            <button disabled={false} onClick={this.onProceedPayment} className="proceed_payment_btn btn btn-lg btn-success">Proceed to Payment</button>
        }

        {
          !this.state.checkout &&
            <Elements>
              <InjectedCheckoutForm 
                onConfirmOrder={this.onConfirmOrder} 
                isSubmitting={this.props.isSubmitting} 
                customerEmail={this.props.customerEmail} 
                stripeCustomerId={this.props.stripeCustomerId}
                paymentMethods={this.props.paymentMethods}
                onCreditCardAdd={this.props.onCreditCardAdd}
                onCreditCardAddFailed={this.props.onCreditCardAddFailed}
                />
            </Elements>
        }
        
      </div>
    )
  }
}