import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import SelectField from "./../Widget/SelectField"
import NanaClient from './../../api/client_api'
import Config from '../../config/config'
import FormConfig from '../../config/form_config'

// Our inner form component which receives our form's state and updater methods as props
const PartnerDetailsForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} className="application_form container">
    <div className="form_errors_container">
      {status && status.externalError}
    </div>
    <br />
    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Country</label></div>
      <div className="col-sm-9 col-xs-12">
        <SelectField name="country" label="Select Country" options={["US", "CA"]} values={values} errors={errors} touched={touched}/>
      </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Legal Entity Type</label></div>
      <div className="col-sm-9 col-xs-12">
        <SelectField name="legal_entity.type" label="Type" options={FormConfig.getLegalEntityTypes()} values={values} errors={errors} touched={touched}/>
      </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Full Name</label></div>
      <div className="col-sm-9 col-xs-12">
        <FormField name="legal_entity.first_name" placeholder="First Name" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
        <FormField name="legal_entity.last_name" label="" placeholder="Last Name" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Date of Birth</label></div>
      <div className="col-sm-9 col-xs-12">
        <SelectField name="legal_entity.dob.month" label="Month" options={FormConfig.getMonths()} values={values} errors={errors} touched={touched}/>
        <SelectField name="legal_entity.dob.day" label="Day" options={FormConfig.getDays()} values={values} errors={errors} touched={touched}/>
        <SelectField name="legal_entity.dob.year" label="Day" options={FormConfig.getYears()} values={values} errors={errors} touched={touched}/>
      </div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>Street Address</label></div>
      <div className="col-sm-9 col-xs-12"><FormField name="legal_entity.address.line1" placeholder="134 Peter Avenue" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>City</label></div>
      <div className="col-sm-9 col-xs-12"><FormField name="legal_entity.address.city" placeholder="Your city" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>

    <div className='row'>
      <div className="col-sm-3 col-xs-12"><label>State/Postal</label></div>
      <div className="col-sm-9 col-xs-12">
        <SelectField name="legal_entity.address.state" label="State" options={FormConfig.getStates()} values={values} errors={errors} touched={touched}/>
        <FormField name="legal_entity.address.postal_code" placeholder="Your Postal Code" values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} touched={touched} />
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

const requiredFields = ["country",
                        "legal_entity.address.city", 
                        "legal_entity.address.line1", 
                        "legal_entity.address.postal_code", 
                        "legal_entity.address.state", 
                        "legal_entity.dob.day", 
                        "legal_entity.dob.month", 
                        "legal_entity.dob.year",
                        "legal_entity.type",
                        "legal_entity.first_name", 
                        "legal_entity.last_name"]


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
      setStatus
    }
  ) => {
    NanaClient.updatePartner(Config.getCurrentUser().id, values).then((res) => {
      setSubmitting(false)

      if (res.body && res.body.error) {
        setStatus({ externalError: res.body.error })
      } else {

      }

    }).catch((err) => {
      setSubmitting(false)
      setStatus({ externalError: "Unable to submit form. Try again later" })
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

