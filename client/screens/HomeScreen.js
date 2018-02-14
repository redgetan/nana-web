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

        <div className='container-fluid photo_container'>
          <Link to="/users/4" >
            <img className='col-xs-6 col-sm-4' src="https://instagram.fybz2-1.fna.fbcdn.net/vp/a9f28c2d2aa45d34d856fc5524bd611a/5B161D49/t51.2885-15/e15/21372499_115943269091211_6912839318490841088_n.jpg" alt=""/>
          </Link>

          <Link to="/users/1" >
            <img className='col-xs-6 col-sm-4' src="https://instagram.fybz2-1.fna.fbcdn.net/vp/da3fca12045023284b8c0760e6f24c35/5AE9C8B3/t51.2885-15/s640x640/sh0.08/e35/15259069_1745486355775465_5928297024561610752_n.jpg" alt=""/>
          </Link>
          <Link to="/users/1" >
          <img className='col-xs-6 col-sm-4' src="https://instagram.fybz2-1.fna.fbcdn.net/vp/3a743c7b6d7025c10c9e49a9d97d8cc6/5B1BCCCC/t51.2885-15/s640x640/sh0.08/e35/15625252_1346823792006668_2626656772504420352_n.jpg" alt=""/>
          </Link>

          <Link to="/users/2" >
          <img className='col-xs-6 col-sm-4' src="https://instagram.fybz2-1.fna.fbcdn.net/vp/99eac1dff7c0622036279b7786a3b5fb/5B16B674/t51.2885-15/sh0.08/e35/p750x750/27878432_173508853291990_5533053646989688832_n.jpg" alt=""/>
          </Link>

          <Link to="/users/6" >
          <img className='col-xs-6 col-sm-4' src="https://instagram.fybz2-1.fna.fbcdn.net/vp/d15b4c479c8d84314948fd037ee51498/5B0B5618/t51.2885-15/e35/25007216_388725868250903_4981313764369367040_n.jpg" alt=""/>
          </Link>
          
          <Link to="/users/4" >
          <img className='col-xs-6 col-sm-4' src="https://instagram.fybz2-1.fna.fbcdn.net/vp/de004ba33f6c979bebb6604c26d0979e/5B21E474/t51.2885-15/e35/21372848_1385407934921221_3426434134614999040_n.jpg" alt=""/>
          </Link>
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
