import React, { Component } from 'react'
import classNames from 'classnames'


export default class FormField extends Component {
  render() {
    return (
      <div className="form_field">
        <input
          type={this.props.type || "text"}
          name={this.props.name}
          autoComplete="new-password"
          className={this.props.touched[this.props.name] && this.props.errors[this.props.name] ? "error" : ""}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          onBlur={this.props.onBlur}
          readOnly={this.props.readOnly}
          value={this.props.values[this.props.name]}
        />
      </div>
    )
  }
}

