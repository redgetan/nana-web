import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import OrderDetails from './../components/Booking/OrderDetails'
import ConfirmPayment from './../components/Booking/ConfirmPayment'
import PriceSummary from './../components/Booking/PriceSummary'
import Wizard from './../components/Widget/Wizard'


export default class BookScreen extends Component {

  state = {
    user: null,
    notFound: false,
    guests: []
  }

  constructor(props) {
    super(props)
    
    this.stepRefs = {}

  }


  steps() {
    return [
      { 
        step: "details",
        label: "Order Details",
        component: <OrderDetails user={this.state.user} ref={el => (this.stepRefs["details"] = el)} />
      },
      { 
        step: "payment",
        label: "Confirm Payment",
        component: <ConfirmPayment user={this.state.user} ref={el => (this.stepRefs["payment"] = el)} />
      }
    ]
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
  }

  render() {
    if (!this.state.user) return <div></div>

    const currentStep = this.props.match.params.step

    return (
      <div className='container'>
        <Wizard steps={this.steps()} stepRefs={this.stepRefs} match={this.props.match} currentStep={currentStep} />
        <PriceSummary basePrice={100} guests={this.state.guests} nextHandler={this.goToNext} />
      </div>
    )
  }

}

