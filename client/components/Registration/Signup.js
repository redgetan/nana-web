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
        <h2>Signup</h2>
        <br />
        <div className='row'>
          <div className="col-xs-12"><FormField name="email" placeholder="asdf@gmail.com" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><FormField name="password" placeholder="password" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <br/>
        <input type="submit" className="btn bt-primary primary_action_btn" value="Create Account"/>
      </form>
    </div>
  )
}

const requiredFields = ["email",
                        "password"]

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




