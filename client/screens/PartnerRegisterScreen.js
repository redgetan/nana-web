import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import OrderDetails from './../components/OrderDetails'
import ConfirmPayment from './../components/ConfirmPayment'
import PriceSummary from './../components/PriceSummary'
import Wizard from './../components/Wizard'
import PartnerDetailsForm from './../components/PartnerDetailsForm'
import PartnerAddressForm from './../components/PartnerAddressForm'
import PartnerTermsOfServiceForm from './../components/PartnerTermsOfServiceForm'

/*
Step 1: What country do you live in?
First, we need to know what country you live in. Your country helps us set up your account to be able to withdraw funds, so please be accurate. This cannot be changed in the future!
*/


export default class PartnerRegisterScreen extends Component {

  state = {
    partner: {},
    errors: {}
  }

  steps() {
    return [
      { 
        step: "personal_details",
        label: "Personal Details",
        component: <PartnerDetailsForm partner={this.state.partner} />
      },
      { 
        step: "address",
        label: "Address",
        component: <PartnerAddressForm partner={this.state.partner} />
      },
      { 
        step: "terms_of_service",
        label: "Terms of Service",
        component: <PartnerTermsOfServiceForm partner={this.state.partner} />
      }
    ]
  }

  componentDidMount() {

  } 

  goToNext = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Wizard steps={this.steps()} match={this.props.match} />
      </div>
    )
  }

}


