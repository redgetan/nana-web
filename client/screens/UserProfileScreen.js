import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Photographer/Profile'
import Gallery from './../components/Widget/Gallery'
import BookRequest from './../components/Photographer/BookRequest'
import ReviewList from './../components/Review/ReviewList'
import PhotographerScreen from './PhotographerScreen'
import Config from './../config/config'
import { Link } from 'react-router-dom'

export default class UserProfileScreen extends Component {

  state = {
    user: null,
    notFound: false
  }

  constructor(props) {
    super(props)

    this.onReviewCreatedHandler = this.onReviewCreated.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    const username = this.props.match.params.username

    ClientAPI.getUser(username).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        this.setState({ user: res.body })
      }
    }).catch((err) => {
      console.log("fail..")
    })
  } 

  onReviewCreated(review) {
    const reviews = this.state.reviews
    reviews.unshift(review)
    this.setState({ reviews: reviews })
  }

  formatJoinDate(time) {
    return (new Date(time)).toLocaleDateString('en-US',{ month: "short", year: 'numeric'})
  }

  formatLocation(text) {
    if (!text) return "World"

    let location = text.replace(/\b\w/g, l => l.toUpperCase())
    let words = location.split(/,\s+/)

    if (words.length === 2) { 
      return words.join(", ")
    } else {
      return words[0] + ", " + words[words.length - 1]
    }
  }

  render() {
    if (this.state.notFound) {
      return <div className='container'>User not found</div>
    }

    if (!this.state.user) {
      return (
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
      )
    } 

    if (this.state.user.is_photographer) {
      return <PhotographerScreen user={this.state.user} />
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className='normal user_avatar_container service_summary col-xs-12 col-sm-4' >
              <img className='user_avatar' src={this.state.user.avatar || "/assets/default_avatar.png"} alt=""/>
              <div className="username">{this.state.user.first_name} {this.state.user.last_name}</div>
              <div className="location"><i className='fa fa-map-marker'></i>{this.formatLocation(this.state.user.location)}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <div className="user_profile_summary ">
                <h3>Bio</h3>
                <p>{this.state.user.bio}</p>
                <h3>Social</h3>
                <div className="join_date_label">Joined {this.formatJoinDate(this.state.user.created_at)}</div>
              </div>
            </div>
          </div>
          <div className='row'>
            <ReviewList reviews={this.state.user.reviews} />
          </div>
        </div>
      </div>
    )

  }
}

