import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import OrderDetails from './../components/Booking/OrderDetails'
import ConfirmPayment from './../components/Booking/ConfirmPayment'
import PriceSummary from './../components/Booking/PriceSummary'
import Wizard from './../components/Widget/Wizard'
import PartnerDetailsForm from './../components/Registration/PartnerDetailsForm'
import PartnerAddressForm from './../components/Registration/PartnerAddressForm'
import Config from './../config/config'
import { Redirect } from 'react-router-dom'

/*
Step 1: What country do you live in?
First, we need to know what country you live in. Your country helps us set up your account to be able to withdraw funds, so please be accurate. This cannot be changed in the future!
*/


export default class PartnerRegisterScreen extends Component {

  state = {
    partner: {},
    errors: {},
    initialStep: ""
  }

  steps() {
    return [
      { 
        step: "personal_details",
        label: "Personal Details",
        component: <PartnerDetailsForm partner={this.state.partner} />
      },
      { 
        step: "bank_account",
        label: "Bank Account",
        component: <PartnerAddressForm partner={this.state.partner} />
      }
    ]
  }

  componentDidMount() {
    const partnerAccount = Config.getPartnerAccount()
    if (partnerAccount) {
      this.setState({ initialStep: "bank_account" })
    } else {
      this.setState({ initialStep: "personal_details" })
    }
  } 

  goToNext = (e) => {
    e.preventDefault()
  }

  render() {
    if (!Config.isSignedIn()) {
      return <Redirect to="/signin"/>
    }

    if (!this.state.initialStep) return <div></div>

    return (
      <div>
        <Wizard steps={this.steps()} match={this.props.match} currentStep={this.state.initialStep} />
      </div>
    )
  }

}


