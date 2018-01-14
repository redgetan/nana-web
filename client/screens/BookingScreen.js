import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import Profile from './../components/Profile'
import OrderDetails from './../components/OrderDetails'
import ConfirmPayment from './../components/ConfirmPayment'

export default class BookScreen extends Component {

  state = {
    completedSteps: [],
    step: "",
    user: null,
    notFound: false
  }

  componentWillMount() {
    const step = this.props.match.params.step
    this.setState({ step: step })
  }

  componentDidMount() {
    const username = this.props.match.params.username

    ClientAPI.getUser(username).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        this.setState({ user: res.body })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  getBookingStep() {
    return {
      "order_details": { 
        component: <OrderDetails user={this.state.user} nextHandler={this.goToNext} />,
        nextStep: "payment"
      },
      "payment": { 
        component: <ConfirmPayment user={this.state.user} nextHandler={this.goToNext} />,
        nextStep: null
      }
    }
  }

  goToNext = (e) => {
    e.preventDefault()

    const nextStep = this.getBookingStep()[this.state.step].nextStep

    if (nextStep) {
      const nextStepUrl = window.location.pathname.replace(this.state.step, nextStep)
      browserHistory.push(nextStepUrl)

      this.setState({ step: nextStep })
    }
  }

  render() {
    if (!this.state.user) return <div></div>
    return (
      <div>
        <div className="step_container">
          <div className="step"><div className="step_icon">1</div> Order Details</div>
          <div className="step"><div className="step_icon">2</div> Confirm Payment</div>
        </div>
        <div className="booking_submit_container">
          { this.getBookingStep()[this.state.step].component }
        </div>
      </div>
    )
  }

}

