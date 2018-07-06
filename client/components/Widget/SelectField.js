import React, { Component } from 'react'
import classNames from 'classnames'
import Select from 'react-select'

import { Field } from 'formik'

export default class SelectField extends Component {
  handleSelectChange = (value) => {
    this.props.setFieldValue("languages", value)
  }

  render() {
    if (this.props.multi) {
      return (
        <Select
            closeOnSelect={false}
            multi
            onChange={this.handleSelectChange}
            options={this.props.options}
            placeholder="Select Languages Spoken"
            removeSelected={true}
            simpleValue
            value={this.props.values[this.props.name]}
          />
      )
    } else if (this.props.options instanceof Array) {
      // options is array
      return (
        <Field component="select" value={this.props.values[this.props.name]} name={this.props.name} className={this.props.touched[this.props.name] && this.props.errors[this.props.name] ? "error" : ""}>
          <option disabled value="">{this.props.label}</option> 
          {
            this.props.options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))
          }
        </Field>
      )
    } else {
      // options is hash
      return (
        <Field component="select" name={this.props.name} className={this.props.touched[this.props.name] && this.props.errors[this.props.name] ? "error" : ""}>
          <option disabled value="">{this.props.label}</option> 
          {
            Object.keys(this.props.options).map((key, index) => (
              <option key={index} value={key}>{this.props.options[key]}</option>
            ))
          }
        </Field>
      )

    }
  }
}


