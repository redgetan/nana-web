import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'
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
        <div className="container-fluid">
          <h1 className="home_title">
            Find a Photographer for your Dating Profile
          </h1>
          <div className="home_description">
            Improve your chance of success in Tinder, OkCupid, Match.com, Bumble, Coffee Meets Bagel
          </div>
          <div className="call_to_action">
            <a href="" className="btn btn-lg btn-primary">Book a Photographer</a>
          </div>
        </div>

        <div className="photographer_directory container-fluid">
          {
            this.state.users.map((user) => (
              <ProfileCard key={user.id} user={user}/>
            ))
          }
        </div>


        <div className="container how_it_works_container">
          <h1>How it Works</h1>
          <ul className="how_it_works_list light_gray">
            <li>Choose a Photographer</li>
            <li>Pick a Date/Time</li>
            <li>Meetup up with photographer and capture beautiful moments</li>
          </ul>
        </div>

        <div className="vertical_spacing" style={{marginBottom: '200px'}}></div>
      </div>
    )
  }

}
