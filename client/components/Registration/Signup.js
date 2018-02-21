import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FormTextArea from "./../Widget/FormTextArea"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'

const SignupForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <div className='signup_container'>
      <form className='' onSubmit={handleSubmit}>
        <div className="form_errors_container">
          {status && status.externalError}
        </div>
        <h2>Signup</h2>
        <br />
        <div className='row'>
          <div className="col-xs-12"><FormField name="first_name" placeholder="First name" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><FormField name="last_name" placeholder="Last name" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><FormField name="email" placeholder="Email" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><FormField name="password" type="password" placeholder="Password" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <br/>
        <input type="submit" className="btn bt-primary primary_action_btn" value="Create Account"/>
        <div className='row secondary_label secondary_actions_container'>
          Already have an account? <a href="/signin" className="">Login</a>
        </div>

      </form>
    </div>
  )
}

const requiredFields = ["first_name", "last_name", "email",
                        "password"]

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

    if (values.password.length < 3) {
      setStatus({ externalError: "Password must be at least 3 characters" })
      setSubmitting(false)
      return
    }

    ClientAPI.signup(values.email, values.password).then((res) => {
      setSubmitting(false)
      if (res.body && res.body.error) {
        setStatus({ externalError: res.body.error })
      } else {
        postAuth(res.body, props)  
      }
    }).catch((err) => {
      setSubmitting(false)
      setStatus({ externalError: "Unable to submit form. Try again later" })
    })

  },
})(SignupForm);


const postAuth = (data, props) => {
  saveUserData(data)
  props.history.push("/")
  renderNavbar()
}

const saveUserData = (data) => {
  Config.setUserData(data)
}




