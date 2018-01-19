import React, { Component } from 'react'
import classNames from 'classnames'


export default class FormField extends Component {
  render() {
    return (
      <div className="form_field">
        <input
          type="text"
          name={this.props.name}
          className={this.props.errors[this.props.name] ? "error" : ""}
          onChange={this.props.handleChange}
          placeholder={this.props.placeholder}
          onBlur={this.props.handleBlur}
          value={this.props.values[this.props.name]}
        />
        {this.props.touched.country && this.props.errors[this.props.name] && <div className="form_error_label">{this.props.errors[this.props.name]}</div>}
      </div>
    )
  }
}

