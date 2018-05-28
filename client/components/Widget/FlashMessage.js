import React, { Component } from 'react'

export default class FlashMessage extends Component {
  render() {
    if (!this.props.status) return <div></div>

    if (this.props.status.error) {
      return (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          { this.props.status.error }
        </div>
      )
    }

    if (this.props.status.success) {
      return (
        <div className="alert alert-success alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          { this.props.status.success }
        </div>
      )
    }

    return <div></div>
  }
}

