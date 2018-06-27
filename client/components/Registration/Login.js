import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FormTextArea from "./../Widget/FormTextArea"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'
import { Redirect } from 'react-router-dom'


const LoginForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  if (Config.getCurrentUser() && !values.redirect) {
    return <Redirect to="/account/manage"/>
  }

  return (
    <div className='login_container'>
      <form className='' onSubmit={handleSubmit}>
        <div className='signin_flash_container'>
          {values.redirect && "You need to signin first"}
        </div>
        <div className="form_errors_container">
          {status && status.externalError}
        </div>
        <h2>Login</h2>
        <br/>
        <div className='row'>
          <div className="col-xs-12"><FormField name="email" placeholder="Email" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <div className='row'>
          <div className="col-xs-12"><FormField name="password" type="password" placeholder="Password" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
        </div>
        <br/>
        <input type="submit" className="btn bt-primary primary_action_btn" value="Login"/>
        <div className='row secondary_label secondary_actions_container'>
          Don't have an account? <Link to="/signup" className="">Signup</Link>
        </div>
      </form>
    </div>
  )
}

const requiredFields = ["email",
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

    const params = new URLSearchParams(props.location.search)
    initialState["redirect"] = params.get("redirect")

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

    ClientAPI.signin(values.email, values.password).then((res) => {
      setSubmitting(false)
      if (res.body && res.body.error) {
        setStatus({ externalError: res.body.error })
      } else {
        postAuth(res.body, props)  
      }
    }).catch((err) => {
      setSubmitting(false)
      setStatus({ externalError: "Unable to login. Try again later" })
    })

  },
})(LoginForm);


const postAuth = (data, props) => {
  Config.setUserData(data)

  data.providers.forEach((provider) => {
    Config.setAccessToken(provider)
  })

  props.onUserAuthenticated(data)

  const params = new URLSearchParams(props.location.search)

  renderNavbar()

  if (params.get("redirect")) {
    window.location.href = params.get("redirect")
  } else {
    props.history.push("/account/manage")
  }
}
