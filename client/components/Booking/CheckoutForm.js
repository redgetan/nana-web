import React from 'react'
import {injectStripe} from 'react-stripe-elements'
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements'
import Config from './../../config/config';

import ClientAPI from './../../api/client_api'
import FlashMessage from "./../Widget/FlashMessage"

class CheckoutForm extends React.Component {

  state = {
    status: {},
    stripeCustomerId: null
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    this.setState({ status: {} })

    if (this.props.stripeCustomerId) {
      return this.props.onConfirmOrder(this.props.stripeCustomerId)
    } else {
      this.addCreditCardAndSubmitBooking()
    }

  }


  addCreditCardAndSubmitBooking() {
    this.props.onCreditCardAdd()

    this.props.stripe.createToken({}).then(({token, error}) => {
      if (error) {
        this.setState({ status: { error: error.message }})
        this.props.onCreditCardAddFailed()
        return
      }

      if (!token) {
        this.setState({ status: { error: "Unable to create stripe card token" }})
        this.props.onCreditCardAddFailed()
        return
      }

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

    })
  }

  onToken(token) {
    console.log("shit token: " + token)
  }

  render() {
    const style = {
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }

    const paymentMethod = this.props.paymentMethods && this.props.paymentMethods[0]

    return (
      <form onSubmit={this.handleSubmit} className='checkout_form'>
        <FlashMessage status={this.state.status} />
        <label>
          Card details
        </label>
        {
          paymentMethod && 
            <div className="payment_method_row">
              {paymentMethod.brand} **** **** **** {paymentMethod.last4} - {paymentMethod.exp_month}/{paymentMethod.exp_year}             
            </div>
        }
        {
          !paymentMethod &&
            <div className='credit_card_form_container' onClick={this.addPaymentMethod}>
              <div className="vertical_spacing line" />
              Add Payment Method
              <div className="vertical_spacing line" />
            </div> 
        }
        <button className='checkout_btn' disabled={this.props.isSubmitting}>{this.props.isSubmitting ? "Loading..." : "Confirm order"}</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);