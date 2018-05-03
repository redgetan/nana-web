import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Photographer/Profile'
import Gallery from './../components/Widget/Gallery'
import BookRequest from './../components/Photographer/BookRequest'
import ReviewList from './../components/Review/ReviewList'
import Config from './../config/config'
import { Link } from 'react-router-dom'

const formatLocation = (text) => {
  if (!text) return "World"

  let location = text.replace(/\b\w/g, l => l.toUpperCase())
  let words = location.split(/,\s+/)

  if (words.length === 2) { 
    return words.join(", ")
  } else {
    return words[0] + ", " + words[words.length - 1]
  }
}

export default class PhotographerScreen extends Component {

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

  render() {
    if (this.state.notFound) {
      return <div>User not found</div>
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

    debugger

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className='user_avatar_container col-xs-12' >
              <img className='user_avatar' src={this.state.user.avatar || "/dist/assets/default_avatar.png"} alt=""/>
              <div className="username">{this.state.user.first_name} {this.state.user.last_name}</div>
            </div>
            <div className="service_summary col-xs-12">
              <div className="location summary_item"><i className='fa fa-map-marker'></i>{formatLocation(this.state.user.location)}</div>
            </div>
          </div>
          <div className='row'>
            <Profile user={this.state.user} />
            { 
              this.state.user.is_photographer && 
                <BookRequest user={this.state.user} />
            }
          </div>
          <div className='row'>
            <Gallery images={this.state.user.photos} />
          </div>
          <div className='row'>
            <ReviewList reviews={this.state.user.reviews} />
          </div>
        </div>
      </div>
    )

  }
}

