import React, { Component } from 'react'
const Rating = require('react-rating')
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { withFormik, Formik, Field } from 'formik'

import Config from './../../config/config'
import ClientAPI from './../../api/client_api'
import Select from 'react-select';
import SelectField from "./../Widget/SelectField"
import FlashMessage from "./../Widget/FlashMessage"
import { Link } from 'react-router-dom'

export default class BookForm extends Component {

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
    const currency = this.props.user.currency
    const minEndDate = this.state.startDate ? this.state.startDate : moment()
    const selectedOption = 'two'
    const user_id = this.props.user.username ? this.props.user.username : this.props.user.id

    return (
      <div className="book_request_form col-xs-12 col-sm-5">
        <div className="cost"><span className="session_price">$ {price} </span> {currency} per hour</div>
        <Link to={`/users/${user_id}/book`} className='book_request_btn btn secondary_action_btn pull-right' >
          Request to Book
        </Link>
        <p>You won't be charged yet</p>
      </div>
    )
  }

}
