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
        <div className="container home_container">
          <h1 className="home_title">
            Find a Photographer for your <span className="home_highlight">Dating Profile</span>
          </h1>
          <div className="home_description">
            Improve your chances on Tinder, OKCupid, Match, Bumble, Coffee Meets Bagel.
          </div>
        </div>

        <div className="call_to_action">
          <a href="" className="btn btn-primary">Get Started</a>
          <a href="" className="call_signup_btn btn btn-primary">Become Photographer</a>
        </div>

        <br/>
        <br/>


        <div className='home_photo_container'>
          <img src="https://instagram.fybz2-2.fna.fbcdn.net/vp/da36a3243757d42cdec08ee2af7a2a61/5B5DD210/t51.2885-15/e35/21149489_1452757384807116_8805558464408453120_n.jpg" alt=""/>
          <img src="https://instagram.fybz2-2.fna.fbcdn.net/vp/56edc3f2c7de2df59e694961e5ec32ec/5B9CDD89/t51.2885-15/e35/30084042_1917379354992766_8237989806236237824_n.jpg" alt=""/>
          <img src="http://image-aws-us-west-2.vsco.co/137ec1/1247224/5a4ae7a15629ad6b80cc4c85/vsco5a4ae7bba522e.jpg" alt=""/>
          <img src="https://instagram.fybz2-1.fna.fbcdn.net/vp/def123fee3f51475da47a5c88c537c59/5B00D50B/t51.2885-15/e35/21576614_1919121631685734_897272020218150912_n.jpg" alt=""/>
          <img src="https://instagram.fybz2-2.fna.fbcdn.net/vp/ae79e4c52e4d0ecdddabe722347e1f4b/5B798902/t51.2885-15/e35/26229258_328237087662435_3347298219724898304_n.jpg" alt=""/>
        </div>

        <div className='container-fluid home_more_info_container'>
          <div className="container home_section_container">
            <h3>How it Works</h3>
            <p>1. Create a profile, which could be screenshots or link to your tinder/okcupid/bumble profile . This will give photographers more context as to how to prepare for the photoshoot </p>
            <p>2. Wait for photographers to contact you or message ones you particularly like. </p>
            <p>3. Meetup for a shoot. It could be a simple portrait, or a candid shot of you doing your regular activity like hanging out with friends or playing frisbee with your dog. Pay photographer, and have your photos sent to you in no time. </p>
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
