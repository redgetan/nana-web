import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FlashMessage from "./../Widget/FlashMessage"
import FormTextArea from "./../Widget/FormTextArea"
import SelectField from "./../Widget/SelectField"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'
import FormConfig from '../../config/form_config'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const locationInputProps = (values, setFieldValue) => {
  return {
    value: values.location,
    onChange: (newValue) => { setFieldValue('location', newValue) },
    placeholder: 'Enter City',
    autoFocus: false,
    autoComplete: "new-password"
  }
}  


const searchOptions = {
  types: ['(cities)']
}

const cssClasses = {
  input: '',
  autocompleteContainer: 'location_autocomplete_container'
}

const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
  <div className="autocomplete-root">
    <input {...getInputProps({ autoComplete: "new-password" })} />
    <div className="autocomplete-dropdown-container">
      {suggestions.map(suggestion => (
        <div {...getSuggestionItemProps(suggestion)}>
          <span>{suggestion.description}</span>
        </div>  
      ))}
    </div>
  </div>
);

// Our inner form component which receives our form's state and updater methods as props
const EditServicesForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting,
}) => (
  <form ref={el => (this.form = el)} onSubmit={handleSubmit} className="edit_services_form nana_form">
    <FlashMessage status={status} />
    <div className='row'>
      <div className="col-xs-3"><label>Hourly Rate</label></div>
      <div className="col-xs-9">
        <FormField name="price" placeholder="i.e 100" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Currency</label></div>
      <div className="col-xs-9">
        <SelectField name="currency" label="Select Currency" options={["USD", "CAD"]} values={values} errors={errors} touched={touched}/>
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Languages</label></div>
      <div className="col-xs-9">
        <SelectField name="languages" label="Select Languages" options={["English", "Spanish", "French", "Arabic", "Hindi", "Russian", "Portuguese", "Mandarin", "Japanese", "Korean"]} values={values} errors={errors} touched={touched}/>
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Cameras Used</label></div>
      <div className="col-xs-9">
        <FormField name="cameras" placeholder="i.e Sony a6000, iPhone X" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>What you'll do</label></div>
      <div className="col-xs-9"><FormTextArea name="expectation" placeholder="By the end of a 1 hour session, I'll have snapped at least 20 candid photos of you doing something interesting. I'll give you tips on what to wear, and suggest places to go based on your hobbies/lifestyle." values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>
    <br />
    <input type='submit' className="pull-right btn nana_btn" value="Save" disabled={isSubmitting} />
    <br />
    <br />
  </form>
)

const requiredFields = ["price",
                        "languages",
                        "currency",
                        "cameras", 
                        "expectation"
                        ]


export default withFormik({
  validateOnBlur: true,
  validateOnChange: false,
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    let initialState = {}
    for (var i = 0; i < requiredFields.length; i++) {
      let fieldName = requiredFields[i]
      initialState[fieldName] = props.user[fieldName] || ""
    }

    initialState["onUserUpdated"] = props.onUserUpdated

    return initialState
  },
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    return {}
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
    setStatus({ error: null, success: null })

    ClientAPI.updateUser(Config.getCurrentUser().id, values).then((res) => {
      setSubmitting(false)

      window.scrollTo(0, 0)

      if (res.body && res.body.error) {
        setStatus({ error: res.body.error })
      } else {
        setStatus({ success: "Successfully updated" })
        const user = res.body
        Config.setUserData(user)
        props.onUserUpdated(user)

      }

    }).catch((err) => {
      setSubmitting(false)
      window.scrollTo(0, 0)
      setStatus({ error: err })
    })
  }
})(EditServicesForm);

