import React, { Component } from 'react'

import { withFormik, Field } from 'formik'
import FormField from "./../Widget/FormField"
import FormTextArea from "./../Widget/FormTextArea"
import SelectField from "./../Widget/SelectField"
import ClientAPI from './../../api/client_api'
import Config from '../../config/config'
import FormConfig from '../../config/form_config'

function FlashContainer(props) {
  const {className, style, onClick} = props

  if (!props.status) return ""

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
        { props.status.error }
      </div>
    )
  }

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
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} className="edit_profile_form">
    <FlashContainer status={status} />
    <div className='row'>
      <div className="col-xs-3"><label>Photo</label></div>
      <div className="col-xs-9">
        <div className="user_avatar">
          <img src="/dist/assets/front_bike.png" alt=""/>
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
      <div className="col-xs-3"><label>City</label></div>
      <div className="col-xs-9"><FormField name="location" placeholder="Your city" values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} /></div>
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
      }

    }).catch((err) => {
      setSubmitting(false)
      window.scrollTo(0, 0)
      setStatus({ error: err })
    })
  }
})(EditProfileForm);

