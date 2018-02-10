import React, { Component } from 'react'
import PhotographerDirectory from './../components/Photographer/PhotographerDirectory'
import LocationSearch from './../components/LocationSearch'
import ClientAPI from './../api/client_api'
const Rating = require('react-rating')


export default class UserDirectoryScreen extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    ClientAPI.listUsers().then((res) => {
      if (Array.isArray(res.body)) {
        const users = res.body
        const sortedUsers = users.sort((a, b) => { 
          return (new Date(b.created_at)) - (new Date(a.created_at)) 
        })
        this.setState({ users: sortedUsers })
      } else {
        throw new Error("failed to list users")
      }
    }).catch((err) => {
      alert(err.message)
    })
  } 

  render() {
    const graphData = []

    return (
      <div>
        <div className="container-fluid home_container">
          <h1 className="home_title">
            Find a Photographer for your <span className="home_highlight">Dating Profile</span>
          </h1>
          <div className="home_description">
            <ul>
              <li>No Studio Pics</li>
              <li>Casual yet High Quality Photos</li>
              <li className="desktop_description">Make your hobbies, lifestyle, and intellect standout</li>
            </ul>
          </div>

          <div className="call_to_action">
            <a target="_blank" href="https://nanacupid.typeform.com/to/S5VSBH" className='btn btn-lg call_signup_btn'>Join Waitlist</a>
          </div>
        </div>

        <PhotographerDirectory users={this.state.users} />

        <div className="container how_it_works_container">
          <h1>How it Works</h1>
          <ul className="how_it_works_list light_gray">
            <li>1. Choose a Photographer</li>
            <li>2. Pick a Date/Time as well as a place to meet</li>
            <li>3. Meetup up with photographer and capture beautiful moments</li>
          </ul>

        </div>

        <br />
        <br />
        <div className="get_notified_container">
          <h1>Get Notified</h1>

          <div className='wait_list_description'>Not yet available in your city?</div>
          <a target="_blank" href="https://nanacupid.typeform.com/to/S5VSBH" className="nana_primary_btn btn btn-lg btn-primary">Join our Waiting List</a>
        </div>

        <div className="vertical_spacing" style={{marginBottom: '150px'}}></div>
      </div>
    )
  }

}
