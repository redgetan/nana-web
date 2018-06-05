import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withFormik, Formik, Field } from 'formik'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import SelectField from "./../components/Widget/SelectField"
import FormField from "./../components/Widget/FormField"
import FormTextArea from "./../components/Widget/FormTextArea"
import FlashMessage from "./../components/Widget/FlashMessage"
import PriceSummary from './../components/Booking/PriceSummary'
import Config from '../config/config'

import ClientAPI from './../api/client_api'

const locationInputProps = (values, setFieldValue) => {
  let props = {
    value: values.location,
    onChange: (newValue) => { setFieldValue('location', newValue) },
    placeholder: 'address of meeting place',
    autoFocus: false,
    autoComplete: "new-password"
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
    stripeCustomerId: null
  }

  onConfirmOrder = (stripeCustomerId) => {
    this.setState({ stripeCustomerId: stripeCustomerId })

    // touch all fields
    requiredFields.forEach((fieldName) => {
      this.formik.setTouched(fieldName,true)
    })
    
    this.formik.submitForm()
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
            start_date: null
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

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setStatus({ error: "Invalid email" })
            setSubmitting(false)
            return
          }

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
            }

          }).catch((err) => {
            setSubmitting(false)
            setStatus({ error: "Unable to submit form. Try again later" })
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

          return (
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-6'>
                  <form onSubmit={handleSubmit} className="book_details_form nana_form">
                    <h2 className='center'>Booking Details</h2>
                    <br />
                    <FlashMessage status={status} />

                      {
                        !currentUser && 
                          <div className=''>      
                            <div className='row'>
                              <div className="col-xs-12 col-sm-3"><label>Name</label></div>
                              <div className="col-xs-12 col-sm-9">
                                <FormField name="name" placeholder="" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
                              </div>
                            </div>
                            <div className='row'>
                              <div className="col-xs-12 col-sm-3"><label>Email</label></div>
                              <div className="col-xs-12 col-sm-9">
                                <FormField name="email" placeholder="" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
                              </div>
                            </div>
                          </div>
                      }


                    <div className='row'>
                      <div className="col-xs-12 col-sm-3"><label>When</label></div>
                      <div className="col-xs-12 col-sm-9">
                        <DatePicker
                          dateFormat="LL"
                          placeholderText="photoshoot date"
                          selected={values.start_date}
                          onChange={(date, event) => {
                            setFieldValue('start_date', date)
                          }}
                          onBlur={() => {
                            setFieldTouched("start_date", true)
                          }}
                          className={touched["start_date"] && errors["start_date"] ? "error" : ""}
                          minDate={moment()}
                        />
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
                        <PlacesAutocomplete inputProps={locationInputProps(values, setFieldValue)} classNames={this.locationClassNames(touched, errors)} options={{}} />
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
                    onConfirmOrder={this.onConfirmOrder} 
                    disabled={isSubmitting || !allFieldsPopulated(values)} />
                </div>
              </div>
            </div>
          )

        }}
      />
    )
  }
}


