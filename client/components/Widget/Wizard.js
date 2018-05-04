import React, { Component } from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import WizardStep from './WizardStep'


export default class Wizard extends Component {

  state = {
    currentStep: null,
    completedSteps: [],
  }

  componentWillMount() {
    if (this.props.currentStep) {
      let completedSteps = []
      for (var i = 0; i < this.props.steps.length; i++) {
        let stepData = this.props.steps[i]
        if (stepData.step !== this.props.currentStep) {
          completedSteps.push(stepData.step)
        } else {
          break
        }
      }

      this.setState({ completedSteps: completedSteps })
      this.setState({ currentStep: this.props.currentStep })
    } else {
      this.setState({ currentStep: this.props.steps[0].step })
    }
  }

  goToNext = (e) => {
    e.preventDefault()

    const index = this.props.steps.findIndex((stepData) => { 
      return stepData.step === this.state.currentStep 
    })

    const currentStepData = this.props.steps[index]
    
    debugger
    currentStepData.component.handleNext().then((isSuccess) => {
      const nextStepData = this.props.steps[index + 1]
      this.transitionToNextStep(nextStepData)
    })

  }

  transitionToNextStep(nextStepData) {
    const nextStep = nextStepData && nextStepData.step

    if (nextStep) {
      const nextStepUrl = window.location.pathname.replace(this.state.currentStep, nextStep)
      browserHistory.push(nextStepUrl)

      const completedSteps = this.state.completedSteps
      completedSteps.push(this.state.currentStep)

      this.setState({ completedSteps: completedSteps })
      this.setState({ currentStep: nextStep })
    }
  }

  onStepClick = (e) => {
    e.preventDefault()

    const targetStep = $(e.target).closest(".step").attr("id")
    if (!this.isStepRenderable(targetStep)) return

    const completedSteps = this.state.completedSteps
    const indexOfTargetStep = completedSteps.indexOf(targetStep)
    completedSteps.splice(indexOfTargetStep)

    this.setState({ completedSteps: completedSteps })
    this.setState({ currentStep: targetStep })
  }

  isStepRenderable(step) {
    const stepIndex = this.props.steps.findIndex((stepData) => { return stepData.step === step })
    return stepIndex <= this.state.completedSteps.length 
  }

  render() {
    const stepBasedOnUrl = this.props.match.params.step
    if (!this.isStepRenderable(stepBasedOnUrl)) {
      const beginningStepUrl = window.location.pathname.replace(stepBasedOnUrl, this.props.steps[0].step)
      return ( <Redirect to={beginningStepUrl} /> )
    }

    return (
      <div>
        <WizardNavigation 
          steps={this.props.steps} 
          currentStep={this.state.currentStep} 
          completedSteps={this.state.completedSteps} 
          handleStepClick={this.onStepClick} />
        <WizardContent steps={this.props.steps} currentStep={this.state.currentStep} onNextClick={this.goToNext} />
      </div>
    )
  }
}

const WizardNavigation = (props) => {
  return (
    <div className="wizard_navigation_container">
      {
        props.steps.map((stepData, index) => (
          <WizardStep 
            key={index}
            index={index}
            step={stepData.step}
            stepData={stepData}
            currentStep={props.currentStep}
            completedSteps={props.completedSteps}
            handleStepClick={props.handleStepClick} />
        ))
      }
    </div>
  )
}


const WizardContent = (props) => {
  const stepData = props.steps.find((stepData) => {
    return props.currentStep === stepData.step
  })

  return (
    <div className='wizard_content_container'>
      {stepData.component}
      <button className="wizard_next_btn" onClick={props.onNextClick}>Next</button>
    </div>
  )
}
