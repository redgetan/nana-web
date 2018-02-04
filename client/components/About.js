import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="container about_container">
        <h1>#1 Dating Profile Photography</h1>
        <i className="about_logo fa fa-camera-retro" ></i>
        <p>
          We are a marketplace that matches Instagram Photographers with people who need better dating profile pictures. 
        </p>
        <br />
        <br />

        <div className='wait_list_description'>Not yet available in your city?</div>
        <a target="_blank" href="https://nanacupid.typeform.com/to/S5VSBH" className="nana_primary_btn btn btn-lg btn-primary">Join our Waiting List</a>

        <br />
        <br />
        <br />
        <br />

      </div>
    )
  }
}