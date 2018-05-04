import React, { Component } from 'react'

export default class FlashMessage extends Component {
  render() {
    if (!this.props.status) return <div></div>

    if (this.props.status.error) {
      return (
        <div className="form_errors_container">
          { this.props.status.error }
        </div>
      )
    }

    if (this.props.status.success) {
      return (
        <div className="form_success_container">
          { this.props.status.success }
        </div>
      )
    }

    return <div></div>
  }
}

