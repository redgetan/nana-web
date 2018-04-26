import React, { Component } from 'react'
import PhotographerDirectory from './../components/Photographer/PhotographerDirectory'
import LocationSearch from './../components/LocationSearch'
import ClientAPI from './../api/client_api'
const Rating = require('react-rating')
import { Link } from 'react-router-dom'


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
            Find a Photographer 📷 for your Dating Profile 🔥
          </h1>
          <div className="home_description">
            No Studio Pics. Candid Shots. 100% Satisfaction Guarantee
          </div>
      
          <a href="" class='btn nana_primary_btn'>Become a Photographer</a>
          <a href="" class='btn nana_btn'>Hire a Photographer</a>


          <div className="background_header container">
            <div className='background_square col-sm-4'><img className='square ' src="/assets/afro.jpg" alt=""/>   </div>
            <div className='background_square col-sm-4'><img className='square ' src="/assets/front_bike.png" alt=""/>   </div>
            <div className='background_square col-sm-4'><img className='square ' src="/assets/kimono.jpg" alt=""/>   </div>
          </div>

          <div className="container home_section_container">
            <h3>What is Nana?</h3>
            <p>Nana lets you find photographers who understand how to take candid shots for your dating sites or even social media like instagram.</p>
          </div>

          <div className="container home_section_container">
            <h3>How it Works</h3>
            <p>Enter your current location, and you can immediately find available photographers in your area and chat with them via email. As we're currently in Beta, the prices currently shown are just estimates, but after requesting a session with a photographer and confirming dates with them via email, you can meetup at your agreed upon location and start having your pictures taken.</p>
          </div>

        </div>

        <div className='container home_body_container'>
          <h1 className='home_browser_header'>Browse</h1>

          <LocationSearch />

          {
            this.state.users.map((user) => (
              <div className='user_avatar_container col-xs-6 col-sm-3 col-md-2' key={user.id} >
                <Link to={`/users/${user.id}`} >
                  <img className='user_avatar' src={user.avatar} alt=""/>
                  <div className="username">{user.username}</div>
                </Link>
              </div>
            ))
          }

          <br />
        </div>

        <div className='container-fluid home_more_info_container'>
          <div className="container home_section_container">
            <h3>What to say to Photographers?</h3>
            <p>It's getting more common for people to ask photographers (especially ones from Instagram) to take their Tinder/Bumble/OkCupid profile photos. So most of them would already have an idea of how to go about it. To give photographers more context, it might help to send them a link to your existing profile or at least some pictures that you're currently using. This will give them better idea on what kind of shots to take beforehand.</p>
          </div>

          <div className="container home_section_container">
            <h3>Frequently Asked Questions</h3>
            <p>Check out <a href="/faq">F.A.Q</a> section to learn more or contact us at <a href="mailto:info@nanacupid.com">info@nanacupid.com</a> </p>
          </div>
        </div>
          

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
