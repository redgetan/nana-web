import React, { Component } from 'react'
import PhotographerDirectory from './../components/Photographer/PhotographerDirectory'
import LocationSearch from './../components/LocationSearch'
import ClientAPI from './../api/client_api'
const Rating = require('react-rating')
import { Link } from 'react-router-dom'


export default class HomeScreen extends Component {

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

  // https://stackoverflow.com/a/4878800
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  handleSelect = (address) => {
    const formattedAddress = address.replace(/,\s+/g, "--").replace(/\s+/g,"-")
    this.props.history.push("/places/" + formattedAddress)
  }

  formatShortLocation(location) {
    if (!location) return ""
    return location.split(/,\s+/)[0]
  }

  render() {
    const graphData = []

    return (
      <div>
        <div className="container home_container">
          <h1 className="home_title">
            Rent a Photographer
          </h1>
          <div className="home_description">
            For your Social Media, Dating, or Business Needs. 
          </div>
        </div>

        <LocationSearch handleSelect={this.handleSelect} />

        <br/>
        <br/>


        <div className='home_photo_container'>
          <img src="/assets/girl_lights.jpg" alt=""/>
          <img src="/assets/monkey_forrest.jpg" alt=""/>
          <img src="/assets/dj_asian.jpg" alt=""/>
          <img src="/assets/asian_street.jpg" alt=""/>
        </div>

        <div className='container-fluid home_more_info_container'>
          <div className="home_section_container how_it_works_container">
            <h3 className="home_section_header">How it Works</h3>
            <ul>
              <li className='col-xs-12 col-sm-4'>
                <p className='how_it_works_item_header'>1. Book a Shoot</p>
                <p>Book a photographer that you like while specifying desired time, place, and vision ( i.e link to a sample instagram photo that you want to emulate )</p>
              </li>
              <li className='col-xs-12 col-sm-4'>
                <p className='how_it_works_item_header'>2. Meet with Photographer</p>
                <p>Once a photographer accepts your photoshoot request, you'll meet them on agreed place/time and start having your pictures taken.</p></li>
              <li className='col-xs-12 col-sm-4'>
                <p className='how_it_works_item_header'>3. Receive Photos</p>
                <p>You'll be sent photos via email once they have finished editing. It'll typically take less than a week. </p>
              </li>
            </ul>
          </div>
        </div>

        <div className='container-fluid sample_photographers_container home_section_container'>
          <h3 className='home_section_header'>Nana Photographers</h3>
          <br/>
          {
            this.state.users.length === 0 &&
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
          }
          {
            this.state.users.map((user) => (
              <div className='home user_avatar_container col-xs-6 col-sm-4 col-md-3 col-lg-2' key={user.id} >
                <Link to={`/users/${user.id}`} >
                  <img className='user_avatar' src={user.avatar} alt=""/>
                  <div className="username">{user.username || user.first_name}</div>
                  <div className="location">{this.formatShortLocation(user.location)}</div>
                </Link>
              </div>
            ))
          }
        </div>

        <div className="vertical_spacing" style={{marginBottom: '150px'}}></div>
      </div>
    )
  }

}
