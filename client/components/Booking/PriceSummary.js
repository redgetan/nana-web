import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Config from './../../config/config';
import ClientAPI from './../../api/client_api'
import FlashMessage from "./../Widget/FlashMessage"


export default class PriceSummary extends Component {
  state = {
    checkout: false,
    status: {}
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
      image: 'https://i.imgur.com/ZqhRE80.png',
      email: this.props.customerEmail,
      zipCode: true,
      panelLabel: "Confirm Order",
      allowRememberMe: false
    })
  }

  onStripeTokenCreated = (token) => {
    console.log(token)

    ClientAPI.createPaymentMethod({ email: this.props.customerEmail, token: token }).then((res) => {
      if (res.body.error) {
        this.setState({ status: { error: res.body.error }})

        this.props.onCreditCardAddFailed()
      } else {
        const stripeCustomerId = res.body
        this.props.onConfirmOrder(stripeCustomerId)
      }
    }).catch((error) => {
      this.setState({ status: { error: "Failed to reach nanapx server. Unable to add credit card as payment method" }})

      this.props.onCreditCardAddFailed()
    })
  }

  initStripe() {
    this.stripeHandler = StripeCheckout.configure({
      key: Config.getStripePublicKey(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: this.onStripeTokenCreated
    })

  }

  confirmOrder = () => {
    if (this.props.user.price === 0) {
      this.props.onConfirmOrder()
    } else if (this.props.stripeCustomerId) {
      this.props.onConfirmOrder(this.props.stripeCustomerId)
    }
  }


  render() {
    const totalPrice = this.props.user.price * this.props.duration
    const photographerName = this.props.user.username ? this.props.user.username : [this.props.user.first_name, this.props.user.last_name].join(" ")
    const profileLink = this.props.user.username ? `/${this.props.user.username}` : `/users/${this.props.user.id}`
    const paymentMethod = this.props.paymentMethods && this.props.paymentMethods[0]

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

        <FlashMessage status={this.state.status} clearStatus={() => { this.setState({ status: {} }) }} />

        {
          !this.props.stripeCustomerId && totalPrice > 0 &&
            <button disabled={this.props.disabled} onClick={this.onProceedPayment} className="proceed_payment_btn btn btn-lg btn-success">Proceed to Payment</button>
        }
        {
          this.props.stripeCustomerId && paymentMethod && totalPrice > 0 &&
            <div>
              <div className="vertical_spacing line" />
              <label>
                Card details
              </label>
              <div className="payment_method_row">
                {paymentMethod.brand} **** **** **** {paymentMethod.last4} - {paymentMethod.exp_month}/{paymentMethod.exp_year}
              </div>
              <button className='checkout_btn' disabled={this.props.isSubmitting} onClick={this.confirmOrder}>{this.props.isSubmitting ? "Loading..." : "Confirm order"}</button>
            </div>
        }
        {
          totalPrice === 0 &&
            <div>
              <div className="vertical_spacing line" />
              <button className='checkout_btn' disabled={this.props.isSubmitting} onClick={this.confirmOrder}>{this.props.isSubmitting ? "Loading..." : "Confirm order"}</button>
            </div>
        }

      </div>
    )
  }
}
