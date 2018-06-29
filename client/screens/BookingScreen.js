import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withFormik, Formik, Field } from 'formik'
import DatePicker from 'react-datepicker'
import { DayPickerSingleDateController, isInclusivelyBeforeDay } from 'react-dates'
import { HORIZONTAL_ORIENTATION } from 'react-dates/constants'
import 'react-dates/initialize'


import moment from 'moment'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import classNames from 'classnames'

import SelectField from "./../components/Widget/SelectField"
import FormField from "./../components/Widget/FormField"
import FormTextArea from "./../components/Widget/FormTextArea"
import FlashMessage from "./../components/Widget/FlashMessage"
import PriceSummary from './../components/Booking/PriceSummary'
import Config from '../config/config'

import ClientAPI from './../api/client_api'

const locationInputProps = (values, setFieldValue, setFieldTouched) => {
  let props = {
    value: values.location,
    onChange: (newValue) => { setFieldValue('location', newValue) },
    placeholder: 'address of meeting place',
    autoFocus: false,
    autoComplete: "new-password",
    onBlur: () => {
      setFieldTouched("location", true)
    }
  }

  return props
}  

const requiredFields = ["name",
                        "email",
                        "message", 
                        "location", 
                        "start_date",
                        "duration"]

const allFieldsPopulated = (values) => {
  const result = Object.keys(values).every((field) => { 
    const notEmptyString = typeof values[field] === "string" ? values[field].length > 0 : true
    const notNull = values[field] !== null
    return  notEmptyString && notNull
  })

  return result
}


export default class BookingScreen extends Component {
  state = {
    user: null,
    stripeCustomerId: null,
    checkout: false
  }

  onConfirmOrder = (stripeCustomerId) => {
    this.setState({ stripeCustomerId: stripeCustomerId })

    // touch all fields
    requiredFields.forEach((fieldName) => {
      this.formik.setFieldTouched(fieldName,true)
    })
    
    this.formik.submitForm()
  }

  onCreditCardAdd = () => {
    this.formik.setSubmitting(true)  
  }

  onCreditCardAddFailed = () => {
    this.formik.setSubmitting(false)  
  }

  componentDidMount() {
    const username = this.props.match.params.username

    ClientAPI.getUser(username).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        const user = res.body

        this.setState({ user: user })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 


  locationClassNames(touched, errors) {
    let classNames = {
      autocompleteContainer: 'location_autocomplete_container'
    }

    if (touched["location"] && errors["location"]) {
      classNames["input"] = 'error' 
    }

    return classNames
  }

  onProceedPayment = () => {
    this.setState({ checkout: true })  
  }

  componentWillMount() {
    const currentUser = Config.getCurrentUser()
    if (currentUser && currentUser.payment_methods && currentUser.payment_methods.length > 0) {
      const paymentMethod = currentUser.payment_methods[0]

      this.setState({ stripeCustomerId: paymentMethod.stripe_customer_id })
      this.setState({ paymentMethods: currentUser.paymentMethods })
    }
  }

  disableTouchScroll() {

  }

  enableTouchScroll() {
    
  }

  render() {
    if (!this.state.user) return <div></div>

    const currentUser = Config.getCurrentUser()

    return (
      <Formik
        ref={el => (this.formik = el)}

        initialValues={
          { 
            name: currentUser ? [currentUser.first_name, currentUser.last_name].join(" ") : "", 
            email: currentUser ? currentUser.email : "",
            message: "", 
            duration: 1, 
            location: "", 
            start_date: null,
            focused: false,
            show_date_picker: false
          }
        }

        validate={(values, props) => {
          const errors = {};

          for (var i = 0; i < requiredFields.length; i++) {
            let fieldName = requiredFields[i]
            if (!values[fieldName]) {
              errors[fieldName] = "Required"
            }
          }

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors["email"] = "Invalid"
          }

          return errors;
        }}


        onSubmit={(
            values,
            {
              props,
              setSubmitting,
              setErrors,
              setStatus
            }
        ) => {
          setStatus({ error: null, success: null })

          ClientAPI.createBookRequest({
            stripe_customer_id: this.state.stripeCustomerId,
            name: values.name,
            email: values.email,
            location: values.location,
            start_time: values.start_date.format("LL"),
            duration: values.duration,
            message: values.message,
            photographer_id: this.state.user.id
          }).then((res) => {
            setSubmitting(false)

            if (res.body && res.body.error) {
              setStatus({ error: res.body.error })
              window.scrollTo(0, 0)
            } else {
              setStatus({ success: "Booking Request successful." })
            }

          }).catch((err) => {
            setSubmitting(false)
            setStatus({ error: "Unable to submit form. Try again later" })
            window.scrollTo(0, 0)
          })

        }}

        render={({  
          values,
          errors,
          status,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          isSubmitting
        }) => {
          const fullName = [this.state.user.first_name, this.state.user.last_name].join(" ")
          const currentUser = Config.getCurrentUser()
          const formClass = classNames({
            'checkout': this.state.checkout,
            'book_details_form': true,
            'nana_form': true
          })

          const isMobile = window.innerWidth < 786
          const calendarOrientation = isMobile ? HORIZONTAL_ORIENTATION : HORIZONTAL_ORIENTATION
          const withPortal = isMobile 
          const numberOfMonths = isMobile ? 1 : 2

          return (
            <div className='container'>
              {
                status && status.success && 
                  <div className='row'>
                    <div className='col-xs-12'>
                      <FlashMessage status={status} />
                      <h3>Your photoshoot booking request has been submitted.</h3>  
                      <p>
                        You will only be charged if the photographer accepts your request. Once they have accepted your payment, you'll receive an email notification. 
                        { 
                          currentUser && 
                            <span>
                              To check the status of your request, you can view your pending bookings at 
                              <Link to="/account/bookings" > /account/bookings</Link> 
                            </span>
                        }
                      </p>
                    </div>
                  </div>
              }
              {
                (!status || (status && !status.success)) &&
                  <div className='row'>
                    <div className='col-xs-12 col-sm-6'>
                      <FlashMessage status={status} />
                      <form onSubmit={handleSubmit} className={formClass}>
                        <h2 className='center'>Booking Details</h2>
                        <br />

                          {
                            !currentUser && 
                              <div className=''>      
                                <div className='row'>
                                  <div className="col-xs-12 col-sm-3"><label>Name</label></div>
                                  <div className="col-xs-12 col-sm-9">
                                    <FormField name="name" placeholder="John Smith" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className="col-xs-12 col-sm-3"><label>Email</label></div>
                                  <div className="col-xs-12 col-sm-9">
                                    <FormField name="email" placeholder="jonsnow@gmail.com" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} readOnly={!!this.state.stripeCustomerId} />
                                  </div>
                                </div>
                              </div>
                          }


                        <div className='row'>
                          <div className="col-xs-12 col-sm-3"><label>When</label></div>
                          <div className="col-xs-12 col-sm-9">
                            <div className='start_date_custom_input' onClick={() => { 
                              setFieldValue('show_date_picker', true) 
                              $('html, body').css({ overflow: 'hidden' })
                            }}>
                              {values.start_date && values.start_date.format("LL")}
                            </div>
                            {
                              values.show_date_picker && 
                                <div className="start_date_picker">
                                  <DayPickerSingleDateController
                                    keepOpenOnDateSelect={false}
                                    onClose={() => { 
                                      setFieldValue('show_date_picker', false) 
                                      $('html, body').css({ overflow: 'auto' })
                                    }}
                                    numberOfMonths={numberOfMonths}
                                    orientation={calendarOrientation}
                                    withPortal={withPortal}
                                    date={values.start_date}
                                    onDateChange={date => setFieldValue('start_date', date )} 
                                    focused={true}
                                    hideKeyboardShortcutsPanel={true}
                                    isOutsideRange={day => isInclusivelyBeforeDay(day, moment().add(-1, 'days'))}
                                  />
                                </div>
                            }
                          </div>
                        </div>

                        <div className='row'>
                          <div className="col-xs-12 col-sm-3"><label>Duration</label></div>
                          <div className="col-xs-12 col-sm-9">
                            <SelectField name="duration" label="Select Duration" 
                              options={[
                                { value: 1, label: "1 hour  - 30 photos" },
                                { value: 2, label: "2 hours - 60 photos" },
                                { value: 3, label: "3 hours - 90 photos" },
                                { value: 4, label: "4 hours - 120 photos" }
                              ]} 
                              values={values} errors={errors} touched={touched}/>
                          </div>
                        </div>

                        <div className='row'>
                          <div className="col-xs-12 col-sm-3"><label>Where</label></div>
                          <div className="col-xs-12 col-sm-9">
                            <PlacesAutocomplete inputProps={locationInputProps(values, setFieldValue, setFieldTouched)} classNames={this.locationClassNames(touched, errors)} options={{}} />
                          </div>
                        </div>


                        <div className='row'>
                          <div className="col-xs-12 col-sm-3"><label>Message</label></div>
                          <div className="col-xs-12 col-sm-9">
                            <FormTextArea name="message" className="message_textarea" placeholder="Tell the photographer what kind (i.e Outdoor/Action/Group) of photoshoot you're looking for. It might help to share your existing pictures or even links to sample photos that you want to emulate. " values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
                          </div>
                        </div>

                      </form>
                    </div>
                    <div className='col-xs-12 col-sm-6'>
                      <PriceSummary 
                        user={this.state.user} 
                        customerEmail={values.email}
                        start_date={values.start_date}
                        location={values.location}
                        duration={values.duration} 
                        onProceedPayment={this.onProceedPayment}
                        onConfirmOrder={this.onConfirmOrder} 
                        onCreditCardAdd={this.onCreditCardAdd}
                        onCreditCardAddFailed={this.onCreditCardAddFailed}
                        stripeCustomerId={this.state.stripeCustomerId}
                        paymentMethods={this.state.paymentMethods}
                        isSubmitting={isSubmitting}
                        disabled={isSubmitting || !allFieldsPopulated(values)} />
                    </div>
                  </div>
              }
            </div>
          )

        }}
      />
    )
  }
}


