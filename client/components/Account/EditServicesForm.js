import React, { Component } from 'react'

import { withFormik, Formik, Field } from 'formik'

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

export default class EditServicesForm extends Component {
  handleNext() {
    this.formik.submitForm()
  }

  setOnStepSuccess(listener) {
    this.onStepSuccess = listener
  }

  render() {
    return (
      <Formik
        ref={el => (this.formik = el)}

        initialValues={
          { 
            price: this.props.user.price || "", 
            languages: this.props.user.languages || "", 
            currency: this.props.user.currency || "", 
            cameras: this.props.user.cameras || "", 
            expectation: this.props.user.expectation || "", 
            onUserUpdated: this.props.onUserUpdated 
          }
        }


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

          values.step_type = "my_services_step"

          return ClientAPI.updateUser(Config.getCurrentUser().id, values).then((res) => {
            setSubmitting(false)

            window.scrollTo(0, 0)

            if (res.body && res.body.error) {
              let error = res.body.error
              error = error.replace('price', 'hourly rate')
              setStatus({ error: res.body.error })
            } else {
              setStatus({ success: "Successfully updated" })
              const user = res.body
              Config.setUserData(user)
              values.onUserUpdated(user)

              this.onStepSuccess()
            }

          }).catch((err) => {
            setSubmitting(false)
            window.scrollTo(0, 0)
            setStatus({ error: err })
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
          isSubmitting
        }) => {
          return (
            <form onSubmit={handleSubmit} className="edit_services_form nana_form">
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
                <div className="col-xs-3"><label>What you'll do / Expectation</label></div>
                <div className="col-xs-9"><FormTextArea name="expectation" placeholder="By the end of a 1 hour session, I'll have snapped at least 20 candid photos of you doing something interesting. I'll give you tips on what to wear, and suggest places to go based on your hobbies/lifestyle." values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
              </div>
              <br />
              <br />
            </form>
          )

        }}
      />
    )
  }
}


