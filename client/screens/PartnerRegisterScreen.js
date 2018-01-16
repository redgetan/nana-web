import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import OrderDetails from './../components/OrderDetails'
import ConfirmPayment from './../components/ConfirmPayment'
import PriceSummary from './../components/PriceSummary'
import Wizard from './../components/Wizard'
import PartnerDetailsForm from './../components/PartnerDetailsForm'
import PartnerAddressForm from './../components/PartnerAddressForm'
import PartnerTermsOfServiceForm from './../components/PartnerTermsOfServiceForm'


export default class PartnerRegisterScreen extends Component {

  state = {
    partner: {}
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


