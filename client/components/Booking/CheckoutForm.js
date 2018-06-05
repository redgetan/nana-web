import React from 'react'
import {injectStripe} from 'react-stripe-elements'
import {CardElement} from 'react-stripe-elements'

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

    if (this.props.stripeCustomerId) {
      return this.props.onConfirmOrder(this.props.stripeCustomerId)
    } else {
      this.addCreditCardAndSubmitBooking()
    }

  }

  addCreditCardAndSubmitBooking() {
    this.props.onCreditCardAdd()

    this.props.stripe.createToken({}).then(({token}) => {
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
        this.setState({ status: { error: error }})
        this.props.onCreditCardAddFailed()
      })

    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='checkout_form'>
        <FlashMessage status={this.state.status} />
        <label>
          Card details
        </label>
        <CardElement style={
          {
            base: {fontSize: '18px'},
          }} />
        <button className='checkout_btn' disabled={this.props.isSubmitting}>{this.props.isSubmitting ? "Loading..." : "Confirm order"}</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);