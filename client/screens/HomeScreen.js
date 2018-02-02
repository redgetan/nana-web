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
            <a target="_blank" href="https://nanacupid.typeform.com/to/Ohl4OG" className="btn btn-lg btn-primary">Become a Photographer</a>
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
            <li>Pick a Date/Time as well as a place to meet</li>
            <li>Review wardrobe requirements and agree upon the length of the photoshoot session.</li>
            <li>Meetup up with photographer and capture beautiful moments</li>
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
