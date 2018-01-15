import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import Profile from './../components/Profile'
import OrderDetails from './../components/OrderDetails'
import ConfirmPayment from './../components/ConfirmPayment'
import WizardStep from './../components/WizardStep'
import PriceSummary from './../components/PriceSummary'
import { Redirect } from 'react-router-dom'

export default class BookScreen extends Component {

  state = {
    currentStep: "order_details",
    completedSteps: [],
    user: null,
    notFound: false,
    guests: []
  }

  steps() {
    return {
      "order_details": { 
        index: 1,
        label: "Order Details",
        component: <OrderDetails user={this.state.user} nextHandler={this.goToNext} />,
        prevStep: null,
        nextStep: "payment"
      },
      "payment": { 
        index: 2,
        label: "Confirm Payment",
        component: <ConfirmPayment user={this.state.user} nextHandler={this.goToNext} />,
        prevStep: "order_details",
        nextStep: null
      }
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    const username = this.props.match.params.username

    ClientAPI.getUser(username).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        const user = res.body

        this.setState({ guests: [user] })
        this.setState({ user: user })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  goToNext = (e) => {
    e.preventDefault()

    const nextStep = this.steps()[this.state.currentStep].nextStep

    if (nextStep) {
      const nextStepUrl = window.location.pathname.replace(this.state.currentStep, nextStep)
      browserHistory.push(nextStepUrl)

      const completedSteps = this.state.completedSteps
      completedSteps.push(this.state.currentStep)

      this.setState({ completedSteps: completedSteps })
      this.setState({ currentStep: nextStep })
    }
  }

  onStepClick = (e) => {
    e.preventDefault()

    const targetStep = $(e.target).attr("id")
    if (!this.isStepRenderable(targetStep)) return

    const completedSteps = this.state.completedSteps
    const indexOfTargetStep = completedSteps.indexOf(targetStep)
    completedSteps.splice(indexOfTargetStep)

    this.setState({ completedSteps: completedSteps })
    this.setState({ currentStep: targetStep })
  }

  isStepRenderable(step) {
    const prevStep = this.steps()[step].prevStep
    return prevStep === null || this.state.completedSteps.indexOf(prevStep) !== -1
  }

  render() {
    const stepBasedOnUrl = this.props.match.params.step
    if (!this.isStepRenderable(stepBasedOnUrl)) {
      const beginningStepUrl = window.location.pathname.replace(stepBasedOnUrl, "order_details")
      return ( <Redirect to={beginningStepUrl} /> )
    }

    if (!this.state.user) return <div></div>

    return (
      <div>
        <div className="step_container">
          <WizardStep step="order_details" 
                      stepData={this.steps()["order_details"]} 
                      currentStep={this.state.currentStep}
                      completedSteps={this.state.completedSteps} 
                      handleStepClick={this.onStepClick} />
          <WizardStep step="payment"       
                      stepData={this.steps()["payment"]}       
                      currentStep={this.state.currentStep}
                      completedSteps={this.state.completedSteps} 
                      handleStepClick={this.onStepClick} />
        </div>
        <div className="col-sm-7 booking_submit_container ">
          { this.steps()[this.state.currentStep].component }
        </div>
        <div className="col-sm-5">
          <PriceSummary 
            basePrice={100} 
            guests={this.state.guests} 
            currentStep={this.state.currentStep}
            nextHandler={this.goToNext} />
        </div>
      </div>
    )
  }

}

