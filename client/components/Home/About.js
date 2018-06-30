import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="container about_container">
        <h1 className='center'>About</h1>
        <br/>
        <p>
          We're building a photographer-booking marketplace that's primarily catered towards people who want to improve their social media or dating profiles. In this generation where getting a date could be one-swipe away, its never been more important to invest in your online image, and portray yourself that would best communicate who you are. 
        </p>
        <p>Unfortunately, a lot of people are not the selfie taking type of person, and as such their online pictures inadequately represents themselves. We want to bridge that gap, and match people with modern photographers who can take candid pictures in various circumstances, whether its someone travelling in cool places, or doing a fun activity with friends/strangers. </p>
        <p>If you have any questions, feel free to reach out at <a href="mailto:info@nanapx.com">info@nanapx.com</a></p>

        <br />
        <br />

      </div>
    )
  }
}