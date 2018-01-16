import React, { Component } from 'react'
import classNames from 'classnames'


export default class WizardStep extends Component {
  render() {
    const isCompleted = this.props.completedSteps.indexOf(this.props.step) !== -1
    const isCurrentStep = this.props.step === this.props.currentStep

    const stepClass = classNames({
      'step': true,
      'current': isCurrentStep,
      'completed': isCompleted
    })

    return (
      <div className={stepClass} onClick={this.props.handleStepClick} id={this.props.step} >
        <div className="step_icon">{this.props.index + 1}</div> {this.props.stepData.label}
      </div>
    )

  }
}