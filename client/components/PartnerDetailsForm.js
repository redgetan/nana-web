import React, { Component } from 'react';

import { withFormik } from 'formik';

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
  <form onSubmit={handleSubmit} className="application_form">
    <br />
    <label htmlFor="country">Country</label>
    <input
      type="text"
      name="country"
      className={errors.country ? "error" : ""}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.country}
    />
    {touched.country && errors.country && <div className="form_error_label">{errors.country}</div>}

    <label htmlFor="city">City</label>
    <input
      type="text"
      name="city"
      className={errors.city ? "error" : ""}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.city}
    />
    {touched.city && errors.city && <div className="form_error_label">{errors.city}</div>}

    <label>Street Address</label>
    <input
      type="text"
      name="address"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {touched.password && errors.password && <div>{errors.password}</div>}

    <br />
    <br />
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
    <br />
    <br />
  </form>
)

export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ city: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};
    if (!values.city) {
      errors.city = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.city)
    ) {
      errors.city = 'Invalid email address';
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
    debugger
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

