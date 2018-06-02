import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withFormik, Field } from 'formik'


const locationInputProps = (values, setFieldValue) => {
  return {
    value: values.location,
    onChange: (newValue) => { setFieldValue('location', newValue) },
    placeholder: 'address of meeting place',
    autoFocus: false,
    autoComplete: "new-password"
  }
}  

const cssClasses = {
  input: '',
  autocompleteContainer: 'location_autocomplete_container'
}

const requiredFields = ["email",
                        "message", 
                        "location", 
                        "start_date",
                        "duration"]

const allFieldsPopulated = (values) => {
  const result = Object.keys(values).every((field) => { 
    const notEmptyString = typeof values[field] === "string" ? values[field].length > 0 : true
    const notNull = values[field] !== null
    return  notEmptyString && notNull
  })

  return result
}


export default class OrderDetails extends Component {
  handleNext() {
    this.formik.submitForm()
  }

  setOnStepSuccess(listener) {
    this.onStepSuccess = listener
  }

  render() {
    const currentUser = Config.getCurrentUser()

    return (
      <Formik
        ref={el => (this.formik = el)}

        initialValues={
          { 
            name: currentUser ? [currentUser.first_name, currentUser.last_name].join(" ") : "", 
            email: currentUser ? currentUser.email : "",
            message: "", 
            duration: 1, 
            location: "", 
            start_date: null
          }
        }

        validate={(values, props) => {
          const errors = {};

          for (var i = 0; i < requiredFields.length; i++) {
            let fieldName = requiredFields[i]
            if (!values[fieldName]) {
              errors[fieldName] = "Required"
            }
          }

          return errors;
        }}


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

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setStatus({ error: "Invalid email" })
            setSubmitting(false)
            return
          }

          ClientAPI.createBookRequest({
            location: values.location,
            start_time: values.start_date.format("LL"),
            duration: values.duration,
            message: values.message,
            photographer_id: props.user.id
          }).then((res) => {
            setSubmitting(false)

            if (res.body && res.body.error) {
              setStatus({ error: res.body.error })
            }

          }).catch((err) => {
            setSubmitting(false)
            setStatus({ error: "Unable to submit form. Try again later" })
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
                <div className="col-xs-12"><label>When</label></div>
                <div className="col-xs-12">
                  <DatePicker
                    dateFormat="LL"
                    placeholderText="photoshoot date"
                    selected={values.start_date}
                    onChange={(date, event) => {
                      setFieldValue('start_date', date)
                    }}
                    minDate={moment()}
                  />
                </div>
              </div>

              <div className='row'>
                <div className="col-xs-12"><label>Where</label></div>
                <div className="col-xs-12">
                  <PlacesAutocomplete inputProps={locationInputProps(values, setFieldValue)} classNames={cssClasses} options={{}} />
                </div>
              </div>

              <div className='row'>
                <div className="col-xs-12"><label>Duration</label></div>
                <div className="col-xs-12">
                  <SelectField name="duration" label="Select Duration" 
                    options={[
                      { value: 1, label: "1 hour  - 30 photos" },
                      { value: 2, label: "2 hours - 60 photos" },
                      { value: 3, label: "3 hours - 90 photos" },
                      { value: 4, label: "4 hours - 120 photos" }
                    ]} 
                    values={values} errors={errors} touched={touched}/>
                </div>
              </div>

              <div className='row'>
                <div className="col-xs-12"><label>Message</label></div>
                <div className="col-xs-12">
                  <FormTextArea name="message" className="message_textarea" placeholder="Tell the photographer what kind (i.e Outdoor/Action/Group) of photoshoot you're looking for. It might help to share your existing pictures or even links to sample photos that you want to emulate. " values={values} errors={{}} onChange={handleChange} onBlur={handleBlur} touched={touched} />
                </div>
              </div>

              <button className="btn nana_btn btn-lg" type="submit" disabled={isSubmitting || !allFieldsPopulated(values)}>
                Send Request
              </button>
              <button className="cancel_btn btn" data-dismiss="modal" >Cancel</button>
              <br />
              <br />
            </form>
          )

        }}
      />
    )
  }
}


