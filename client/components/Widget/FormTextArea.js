import React, { Component } from 'react'
import classNames from 'classnames'


export default class FormTextArea extends Component {
  render() {
    return (
      <div className="form_field">
        <textarea
          type="text"
          name={this.props.name}
          className={this.props.touched[this.props.name] && this.props.errors[this.props.name] ? this.props.className + " error" : this.props.className}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          onBlur={this.props.onBlur}
          value={this.props.values[this.props.name]}
        />
      </div>
    )
  }
}

