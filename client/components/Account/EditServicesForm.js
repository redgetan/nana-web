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
            price: this.props.user.price || 20, 
            languages: this.props.user.languages || "", 
            currency: this.props.user.currency || "", 
            cameras: this.props.user.cameras || "", 
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

          return ClientAPI.updateUser(Config.getCurrentUser().id, values).then((res) => {
            setSubmitting(false)

            window.scrollTo(0, 0)

            if (res.body && res.body.error) {
              let error = res.body.error
              error = error.replace('price', 'hourly rate')
              setStatus({ error: res.body.error })
            } else {
              ClientAPI.completeServicesStep(this.props.user.id, "details").then((res) => {
                const user = res.body

                Config.setUserData(user)
                values.onUserUpdated(user)

                this.onStepSuccess()
              })
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
          const languageOptions = ["English", "Spanish", "French", "Arabic", "Hindi", "Russian", "Portuguese", "Mandarin", "Japanese", "Korean"].map((language) => {
            return { value: language, label: language }
          })

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
                  <SelectField name="currency" label="Select Currency" options={[{ value: "USD", label: "USD" }, { value: "CAD", label: "CAD" }]} values={values} errors={errors} touched={touched}/>
                </div>
              </div>
              <div className='row'>
                <div className="col-xs-3"><label>Language</label></div>
                <div className="col-xs-9">
                  <SelectField name="languages" label="Select Languages" options={languageOptions} values={values} errors={errors} touched={touched}/>
                </div>
              </div>
              <div className='row'>
                <div className="col-xs-3"><label>Cameras Used</label></div>
                <div className="col-xs-9">
                  <FormField name="cameras" placeholder="i.e Sony a6000, iPhone X" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
                </div>
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


