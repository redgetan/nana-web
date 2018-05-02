import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FormTextArea from "./../Widget/FormTextArea"
import SelectField from "./../Widget/SelectField"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'
import FormConfig from '../../config/form_config'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

function FlashContainer(props) {
  const {className, style, onClick} = props

  if (!props.status) return <div></div>

  if (props.status.error) {
    return (
      <div className="form_errors_container">
        { props.status.error }
      </div>
    )
  }

  if (props.status.success) {
    return (
      <div className="form_success_container">
        { props.status.success }
      </div>
    )
  }

  return <div></div>

}

const onChange = (newVal) => {
  console.log(newVal) 
}

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

const onAvatarProvided = (props, setFieldValue, event) => {
  const file = event.target.files[0]
  return ClientAPI.s3Sign({ filename: file.name }).then((res) => {
    const data = res.body

    $.ajax({
      url: data.url,
      type: 'PUT',
      data: file,
      contentType: file.type, // Content type must much with the parameter you signed your URL with
      processData: false, // this flag is important, if not set, it will try to send data as a form
      success: function() {
        const avatarUrl = data.url.replace(/\?.*/,''); // remove query params

        ClientAPI.changeUserAvatar(Config.getCurrentUser().id, avatarUrl).then((res) => {
          const user = res.body
          setFieldValue('avatar', user.avatar)
          Config.setUserData(user)
          props.onUserUpdated(user)
        })
      },
      error: function(data) {

      }
    })

  })
}

// Our inner form component which receives our form's state and updater methods as props
const EditProfileForm = ({
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
  <form onSubmit={handleSubmit} className="edit_profile_form">
    <FlashContainer status={status} />
    <div className='row'>
      <div className="col-xs-3"><label>Photo</label></div>
      <div className="col-xs-9">
        <div className="user_avatar">
          <img src={values.avatar} alt="" />
          <span className="upload_avatar_btn btn-file">
            <div className="upload_avatar_label">
              Change Photo
            </div>
            <input className="user_avatar" name="user[avatar]" type="file" onChange={onAvatarProvided.bind(this, values, setFieldValue)} />
          </span>
        </div>
      </div>
    </div>
    <br />
    <div className='row'>
      <div className="col-xs-3"><label>First Name</label></div>
      <div className="col-xs-9">
        <FormField name="first_name" placeholder="First Name" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Last Name</label></div>
      <div className="col-xs-9">
        <FormField name="last_name" placeholder="Last Name" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Email</label></div>
      <div className="col-xs-9">
        <FormField name="email" placeholder="email address" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
        <p className='form_field_description'>We won’t share your private email address with other users</p>
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Location</label></div>
      <div className="col-xs-9">
        <div className="form_field">
          <PlacesAutocomplete inputProps={locationInputProps(values, setFieldValue)} classNames={cssClasses} options={searchOptions} />
        </div>
      </div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Bio</label></div>
      <div className="col-xs-9"><FormTextArea name="bio" placeholder="describe yourself" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Price</label></div>
      <div className="col-xs-9"><FormField name="price" placeholder="20" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
    </div>
    <div className='row'>
      <div className="col-xs-3"><label>Currency</label></div>
      <div className="col-xs-9">
        <SelectField name="currency" label="Select Currency" options={["USD", "CAD"]} values={values} errors={errors} touched={touched}/>
      </div>
    </div>
    
    <br />
    <input type='submit' className="pull-right btn nana_btn" value="Save" disabled={isSubmitting} />
    <br />
    <br />
  </form>
)

const requiredFields = ["first_name",
                        "last_name",
                        "email",
                        "location", 
                        "bio", 
                        "avatar"
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
})(EditProfileForm);

