import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FormTextArea from "./../Widget/FormTextArea"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import SelectField from "./../Widget/SelectField"
import FlashMessage from "./../Widget/FlashMessage"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const locationInputProps = (values, setFieldValue) => {
  return {
    value: values.location,
    onChange: (newValue) => { setFieldValue('location', newValue) },
    placeholder: 'address of meeting place',
    autoFocus: false,
    autoComplete: "new-password"
  }
}  

const cssClasses = {
  input: '',
  autocompleteContainer: 'location_autocomplete_container'
}

// Our inner form component which receives our form's state and updater methods as props
const ContactForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  handleSubmit,
  isSubmitting,
}) => {

  let modalHeader = null
  let modalBody   = null
  const currentUser = Config.getCurrentUser()

  if (status && status.finishedSubmitting) {
    modalHeader = <div className="modal-header contact_success">
      <i className='check_icon fa fa-check'></i>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    </div>

    modalBody = <div className="modal-body contact_success">
      <h2>Great!</h2>
      <p>Your message has been sent.</p>
    </div>
  } else {
    modalHeader = <div className=""></div>

    modalBody = <div className="modal-body contact_success">
      <form onSubmit={handleSubmit} className="contact_form">
        <div className="form_errors_container">
          {status && status.externalError}
        </div>
        <div className='row'>
          <div className="col-xs-12"><label>When</label></div>
          <div className="col-xs-12">
            <DatePicker
              dateFormat="LL"
              placeholderText="photoshoot date"
              selected={values.start_date}
              onChange={(date, event) => {
                setFieldValue('start_date', date)
              }}
              minDate={moment()}
            />
          </div>
        </div>

        <div className='row'>
          <div className="col-xs-12"><label>Where</label></div>
          <div className="col-xs-12">
            <PlacesAutocomplete inputProps={locationInputProps(values, setFieldValue)} classNames={cssClasses} options={{}} />
          </div>
        </div>

        <div className='row'>
          <div className="col-xs-12"><label>Duration</label></div>
          <div className="col-xs-12">
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
          <div className="col-xs-12"><label>Message</label></div>
          <div className="col-xs-12">
            <FormTextArea name="message" className="message_textarea" placeholder="Tell the photographer what kind (i.e Outdoor/Action/Group) of photoshoot you're looking for. It might help to share your existing pictures or even links to sample photos that you want to emulate. " values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
          </div>
        </div>

        <button className="btn nana_btn btn-lg" type="submit" disabled={isSubmitting || !allFieldsPopulated(values)}>
          Send Request
        </button>
        <button className="cancel_btn btn" data-dismiss="modal" >Cancel</button>
        <br />
        <br />
      </form>
    </div>
  }

  return (
    <div className="modal fade" id="contact_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {modalHeader}
          {modalBody}
        </div>
      </div>
    </div>
  )
}

const requiredFields = ["email",
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

export default withFormik({
  validateOnBlur: true,
  validateOnChange: false,
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    let initialState = { "name": "", "email": "", "message": "", duration: 1, location: "", start_date: null}

    const currentUser = Config.getCurrentUser()
    if (currentUser) {
      initialState["name"]  = [currentUser.first_name, currentUser.last_name].join(" ")
      initialState["email"] = currentUser.email
    }

    return initialState
  },
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};

    for (var i = 0; i < requiredFields.length; i++) {
      let fieldName = requiredFields[i]
      if (!values[fieldName]) {
        errors[fieldName] = "Required"
      }
    }

    return errors;
  },
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors,
      setStatus,
      resetForm
    }
  ) => {
    setStatus({ externalError: "" })

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      setStatus({ externalError: "Invalid email" })
      setSubmitting(false)
      return
    }

    ClientAPI.createBookRequest({
      location: values.location,
      start_time: values.start_date.format("LL"),
      duration: values.duration,
      message: values.message,
      photographer_id: props.user.id
    }).then((res) => {
      setSubmitting(false)

      if (res.body && res.body.error) {
        setStatus({ externalError: res.body.error })
      } else {
        setStatus({ finishedSubmitting: true })
        setTimeout(() => {
          $('#contact_modal').modal('hide')
          resetForm()
          setStatus({ finishedSubmitting: false })
        },1000)
      }

    }).catch((err) => {
      setSubmitting(false)
      setStatus({ externalError: "Unable to submit form. Try again later" })
    })
  },
})(ContactForm);

