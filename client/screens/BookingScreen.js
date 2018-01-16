import React, { Component } from 'react'

import ClientAPI from './../api/client_api'
import OrderDetails from './../components/OrderDetails'
import ConfirmPayment from './../components/ConfirmPayment'
import PriceSummary from './../components/PriceSummary'
import Wizard from './../components/Wizard'


export default class BookScreen extends Component {

  state = {
    user: null,
    notFound: false,
    guests: []
  }

  steps() {
    return [
      { 
        step: "order_details",
        label: "Order Details",
        component: <OrderDetails user={this.state.user} />
      },
      { 
        step: "payment",
        label: "Confirm Payment",
        component: <ConfirmPayment user={this.state.user} />
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

    return (
      <div>
        <Wizard steps={this.steps()} match={this.props.match} />
        <PriceSummary basePrice={100} guests={this.state.guests} nextHandler={this.goToNext} />
      </div>
    )
  }

}

