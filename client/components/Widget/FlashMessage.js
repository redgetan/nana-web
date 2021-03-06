import React, { Component } from 'react'

export default class FlashMessage extends Component {

  state = {
    visible: true
  }

  onCloseClick = () => {
    this.setState({ visible: false })
    this.props.clearStatus()
  }

  componentWillReceiveProps() {
    this.setState({ visible: true })
  }

  render() {
    if (!this.props.status) return <div></div>

    if (this.props.status.error && this.state.visible) {
      return (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close" data-hide="alert" aria-label="Close" ref={el => (this.closeBtn = el)} onClick={this.onCloseClick}><span aria-hidden="true">&times;</span></button>
          { this.props.status.error }
        </div>
      )
    }

    if (this.props.status.success && this.state.visible) {
      return (
        <div className="alert alert-success alert-dismissible" role="alert">
          <button type="button" className="close" data-hide="alert" aria-label="Close" ref={el => (this.closeBtn = el)} onClick={this.onCloseClick}><span aria-hidden="true">&times;</span></button>
          { this.props.status.success }
        </div>
      )
    }

    return <div></div>
  }
}

