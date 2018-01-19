import React, { Component } from 'react'
import ProfileCard from './../components/ProfileCard'
import ClientAPI from './../api/client_api'


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
        <div className="container">
          <h1 className="home_title">
            Find a Photographer for your Dating Profile
          </h1>
          <div className="home_description">
            Improve your chance of success in Tinder, OkCupid, Match.com, Bumble, Coffee Meets Bagel
          </div>
          <div className="home_sample_photo_container">
            <img className="home_sample_photo" src="/assets/afro.jpg" alt=""/>
            <img className="home_sample_photo" src="/assets/front_bike.png" alt=""/>
            <img className="home_sample_photo" src="/assets/kimono.jpg" alt=""/>
          </div>
        </div>

        <div className="container how_it_works_container">
          <h2>How it Works</h2>
          <ul>
            <li>Choose a Photographer</li>
            <li>Pick a Date/Time</li>
            <li>Meetup up with photographer and capture beautiful moments</li>
          </ul>
        </div>

        <div className="vertical_spacing" style={{marginBottom: '200px'}}></div>
        {
          this.state.users
                    .map((user) => (
            <ProfileCard key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }

}
