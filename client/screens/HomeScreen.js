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
        <div className="container">
          <h1 className="home_title">
            Find a Photographer for your Dating Profile
          </h1>
          <div className="home_description">
            Improve your chance of success in Tinder, OkCupid, Match.com, Bumble, Coffee Meets Bagel
          </div>
          <div className="call_to_action">
            <a href="" className="btn btn-lg btn-primary">Become a Photographer</a>
            <a href="" className="call_signup_btn btn btn-lg btn-primary">Sign up for Session</a>
          </div>
          <div className="home_sample_photo_container">
            <div className="photo_card">
              <div className="author_header">
                <div className="user_avatar"><img src="https://pbs.twimg.com/profile_images/763917100624715776/C8hiV68x_bigger.jpg" alt=""/></div>
                <div className="username">normalvr</div>
              </div>
              <img className="home_sample_photo" src="/assets/afro.jpg" alt=""/>
              <div className="user_rating">
                <Rating 
                  emptySymbol="fa fa-star-o"
                  fullSymbol="fa fa-star"
                  readonly={true}
                  initialRating={5}
                />

              </div>
              <div className="cost"><span className="session_price">$60</span> per person</div>
            </div>

            <div className="photo_card">
              <div className="author_header">
                <div className="user_avatar"><img src="https://pbs.twimg.com/profile_images/875643236416540672/nFPJfCQ-_bigger.jpg" alt=""/></div>
                <div className="username">phillyd</div>
              </div>
              <img className="home_sample_photo" src="/assets/front_bike.png" alt=""/>
              <div className="user_rating">
                <Rating 
                  emptySymbol="fa fa-star-o"
                  fullSymbol="fa fa-star"
                  readonly={true}
                  initialRating={5}
                />

              </div>
              <div className="cost"><span className="session_price">$95</span> per person</div>
            </div>

            <div className="photo_card">
              <div className="author_header">
                <div className="user_avatar"><img src="https://pbs.twimg.com/profile_images/3729678808/db560ecbeb1b6bcf5d553358ea2c0e41_bigger.png" alt=""/></div>
                <div className="username">seasailor</div>
              </div>
              <img className="home_sample_photo" src="/assets/kimono.jpg" alt=""/>
              <div className="user_rating">
                <Rating 
                  emptySymbol="fa fa-star-o"
                  fullSymbol="fa fa-star"
                  readonly={true}
                  initialRating={5}
                />

              </div>
              <div className="cost"><span className="session_price">$130</span> per person</div>
            </div>

          </div>
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
