import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FormTextArea from "./../Widget/FormTextArea"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'

// Our inner form component which receives our form's state and updater methods as props
const ContactForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {

  let modalHeader = null
  let modalBody   = null

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
    modalHeader = <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    </div>

    modalBody = <div className="modal-body contact_success">
      <form onSubmit={handleSubmit} className="contact_form">
        <div className="form_errors_container">
          {status && status.externalError}
        </div>
        <div className='row'>
          <div className="col-xs-12"><label>Name</label></div>
          <div className="col-xs-12">
            <FormField name="name" placeholder="" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
          </div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><label>Email</label></div>
          <div className="col-xs-12">
            <FormField name="email" placeholder="" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
          </div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><label>Link to Existing Pictures</label></div>
          <div className="col-xs-12"><span>Example: <a href="https://imgur.com/gallery/2s30Y7g" target="_blank">https://imgur.com/gallery/2s30Y7g</a></span></div>
          <div className="col-xs-12">
            <FormField name="album_link" placeholder="" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
          </div>
        </div>

        <div className='row'>
          <div className="col-xs-12"><label>Message</label></div>
          <div className="col-xs-12">
            <FormTextArea name="text" className="message_textarea" placeholder="Tell photographer a bit about yourself, where you want your shots taken, or ask them questions about the photoshoot." values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
          </div>
        </div>

        <button className="btn btn-primary btn-lg" type="submit" disabled={isSubmitting || !allFieldsPopulated(values)}>
          Send Message
        </button>
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
                        "text", 
                        "name",
                        "album_link"]

const allFieldsPopulated = (values) => {
  const result = Object.keys(values).every((field) => { 
    return values[field].length > 0 
  })

  return result
}

export default withFormik({
  validateOnBlur: true,
  validateOnChange: false,
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    let initialState = {}
    for (var i = 0; i < requiredFields.length; i++) {
      let fieldName = requiredFields[i]
      initialState[fieldName] = ""
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


    debugger

    ClientAPI.createMessage({
      sender_name: values.name,
      sender_email: values.email,
      album_link: values.album_link,
      text: values.text,
      recipient_id: props.user.id
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

