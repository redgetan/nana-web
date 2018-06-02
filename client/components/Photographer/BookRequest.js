import React, { Component } from 'react'
const Rating = require('react-rating')
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { withFormik, Formik, Field } from 'formik'

import Config from './../../config/config'
import ClientAPI from './../../api/client_api'
import ContactForm from "./ContactForm"
import Select from 'react-select';
import SelectField from "./../Widget/SelectField"
import FlashMessage from "./../Widget/FlashMessage"

export default class BookRequest extends Component {

  state = {
    startDate: null,
    endDate: null,
  }

  handleStartChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleEndChange = (date) => {
    this.setState({
      endDate: date
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  handleDurationChange() {

  }

  render() {
    const price = this.props.user.price ? this.props.user.price : "90-200"
    const minEndDate = this.state.startDate ? this.state.startDate : moment()
    const selectedOption = 'two'

    return (
      <div className="book_request_form col-xs-12 col-sm-5">
        <div className="cost"><span className="session_price">$ {price}</span> per hour</div>
        <input type='submit' className='book_request_btn btn secondary_action_btn pull-right' value="Request to Book" data-toggle="modal" data-target="#contact_modal" />
        <p>You won't be charged yet</p>
        <ContactForm user={this.props.user} />
      </div>
    )
  }

  bookRequest = (event) => {
    event.preventDefault()

    console.log("button clicked")
  }

}
