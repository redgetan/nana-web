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

    const stepRef = this.props.stepRefs[this.state.currentStep]

    stepRef.setOnStepSuccess((newStep) => {
      const nextStepData = this.props.steps[index + 1]
      this.transitionToNextStep(nextStepData)
    })

    stepRef.handleNext()
  }

  goToPrev = (e) => {
    e.preventDefault()

    let index = this.props.steps.findIndex((stepData) => { 
      return stepData.step === this.state.currentStep 
    })

    if (index === -1) index = this.props.steps.length - 1 // assume im coming from last step

    const prevStepData = this.props.steps[index - 1]
    this.transitionToPrevStep(prevStepData)
  }

  transitionToPrevStep(stepData) {
    const prevStep = stepData && stepData.step

    if (prevStep) {
      const stepUrl = window.location.pathname.replace(this.state.currentStep, prevStep)
      browserHistory.push(stepUrl)

      const completedSteps = this.state.completedSteps
      completedSteps.pop()

      this.setState({ completedSteps: completedSteps })
      this.setState({ currentStep: prevStep })
    }
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

    const isFirstStep = this.state.currentStep === this.props.steps[0].step
    const isLastStep = this.state.currentStep === this.props.steps[this.props.steps.length - 1].step ||
                       this.state.currentStep === "submitted"


    return (
      <div>
        <WizardNavigation 
          steps={this.props.steps} 
          currentStep={this.state.currentStep} 
          completedSteps={this.state.completedSteps} 
          handleStepClick={this.onStepClick} />
        <WizardContent steps={this.props.steps} currentStep={this.state.currentStep} />

        { 
          !isFirstStep && 
            <button className="wizard_back_btn btn pull-left" onClick={this.goToPrev}>Prev</button>
        }
        { 
          !isLastStep && 
            <button className="wizard_next_btn btn btn-primary pull-right" onClick={this.goToNext}>Next</button>
        }
        
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
  let stepData = props.steps.find((stepData) => {
    return props.currentStep === stepData.step
  })

  const hasFinishedAllSteps = !stepData
  if (hasFinishedAllSteps) stepData = props.steps[props.steps.length - 1]

  return (
    <div className='wizard_content_container'>
      {stepData.component}
    </div>
  )
}
