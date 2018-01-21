import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./FormField"
import ClientAPI from './../api/client_api'

// Our inner form component which receives our form's state and updater methods as props
const PartnerDetailsForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} className="application_form container">
    <br />
    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Country</label></div>
      <div className="col-sm-9 col-xs-12">
        <Field component="select" name="country" >
          {
            ["US", "Canada"].map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))
          }
        </Field>
        </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Full Name</label></div>
      <div className="col-sm-9 col-xs-12">
        <FormField name="first_name" placeholder="First Name" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
        <FormField name="last_name" label="" placeholder="Last Name" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Date of Birth</label></div>
      <div className="col-sm-9 col-xs-12">
        <Field component="select" name="dob_month" >
          {
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"].map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))
          }
        </Field>
        <Field component="select" name="dob_day">
          {
            [1,2,3,4,5,6,7,8,9].map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))
          }
        </Field>
        <Field component="select" name="dob_year">
          {
            [1900,2000].map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))
          }
        </Field>
      </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Street Address</label></div>
      <div className="col-sm-9 col-xs-12"><FormField name="line1" placeholder="134 Peter Avenue" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>City</label></div>
      <div className="col-sm-9 col-xs-12"><FormField name="city" placeholder="Your city" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>State/Postal</label></div>
      <div className="col-sm-9 col-xs-12">
        <FormField name="state" placeholder="Your State" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
        <FormField name="postal_code" placeholder="Your Postal Code" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>
    
    <div className='row'>
      <div className="col-xs-12">
        <input type="checkbox" name="checkbox" id="checkbox_id" value="value" />
        <label htmlFor="checkbox_id" className="checkbox_label">I accept the terms of service.</label>
      </div>
    </div>
    <br />
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
    <br />
    <br />
  </form>
)

const requiredFields = ["city", "line1", "postal_code", "state", "dob_day", "dob_month", "dob_year",
                        "first_name", "last_name"]


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

    initialState["country"] = "Canada"
    initialState["dob_month"] = "1"
    initialState["dob_day"] = "1"
    initialState["dob_year"] = "1990"

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
      setErrors /* setValues, setStatus, and other goodies */,
    }
  ) => {
    ClientApi.updatePartner(Config.getCurrentUser().id, values).then((res) => {
      debugger

    }).catch((err) => {

    })


    console.log("form submitted")
    // LoginToMyApp(values).then(
    //   user => {
    //     setSubmitting(false);
    //     // do whatevs...
    //     // props.updateUser(user)
    //   },
    //   errors => {
    //     setSubmitting(false);
    //     // Maybe even transform your API's errors into the same shape as Formik's!
    //     // setErrors(transformMyApiErrors(errors));
    //   }
    // )
  },
})(PartnerDetailsForm);

