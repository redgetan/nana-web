import React, { Component } from 'react'
const Rating = require('react-rating')
import DatePicker from 'react-datepicker'
import moment from 'moment'

import Config from './../../config/config'
import ClientAPI from './../../api/client_api'
import ContactForm from "./ContactForm"
import Select from 'react-select';
import SelectField from "./../Widget/SelectField"

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
        <form className='' onSubmit={this.bookRequest}>
          <div className="cost"><span className="session_price">$ {price}</span> per hour</div>
          <div className="photoshoot_date_range">
            <div className='photoshoot_details_row'>
              <label>When</label>
              <div className='photoshoot_block'>
                <DatePicker
                    dateFormat="LL"
                    placeholderText="Start Time"
                    selected={this.state.startDate}
                    onChange={this.handleStartChange}
                    minDate={moment()}
                />
              </div>
            </div>
            <div className='photoshoot_details_row'>
              <label>Where</label>
              <div>
                <input type="text" placeholder='exact address to meet' />
              </div>
            </div>
            <div className='photoshoot_details_row'>
              <label>Duration</label>
              <div>
              <Select
                name="duration"
                clearable={false}
                searchable={false}
                value={selectedOption}
                onChange={this.handleDurationChange}
                options={[
                  { value: 'one', label: '1 hour - 30 photos' },
                  { value: 'two', label: '2 hours - 60 photos' },
                  { value: 'three', label: '3 hours - 90 photos' },
                ]}
              />
              </div>
            </div>
          </div>
          <div className='user_rating'>
            <Rating 
              emptySymbol="fa fa-star-o fa"
              fullSymbol="fa fa-star fa"
              initialRating={5}
              readonly={true}
            />
          </div>
          <input type='submit' className='book_request_btn btn secondary_action_btn pull-right' value="Request to Book" data-toggle="modal" data-target="#contact_modal" />
        </form>
        <ContactForm user={this.props.user} />
      </div>
    )
  }

  bookRequest = (event) => {
    event.preventDefault()

    console.log("button clicked")
  }

}
