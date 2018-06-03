import React from 'react'
import {injectStripe} from 'react-stripe-elements'
import {CardElement} from 'react-stripe-elements'

import ClientAPI from './../../api/client_api'

class CheckoutForm extends React.Component {

  state = {

  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()

    this.props.stripe.createToken({}).then(({token}) => {
      if (token) {
        ClientAPI.createPaymentMethod({ email: this.props.email, token: token }).then((res) => {
          const stripeCustomerId = res.body 
          this.props.onConfirmOrder(stripeCustomerId)
        }).catch((error) => {

        })
      }
    })

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='checkout_form'>
        <label>
          Card details
        </label>
        <CardElement style={
          {
            base: {fontSize: '18px'},
          }} />
        <button className='checkout_btn'>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);