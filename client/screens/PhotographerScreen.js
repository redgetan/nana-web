import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Photographer/Profile'
import Gallery from './../components/Widget/Gallery'
import BookForm from './../components/Photographer/BookForm'
import ReviewList from './../components/Review/ReviewList'
import Config from './../config/config'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default class PhotographerScreen extends Component {

  state = {
    user: null,
    notFound: false
  }

  constructor(props) {
    super(props)

    this.onReviewCreatedHandler = this.onReviewCreated.bind(this)
  }

  onReviewCreated(review) {
    const reviews = this.state.reviews
    reviews.unshift(review)
    this.setState({ reviews: reviews })
  }

  formatLocation(text) {
    if (!text) return "World"

    let location = text.replace(/\b\w/g, l => l.toUpperCase())
    return location
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    // user not provided, fetch it
    if (!this.props.user) {
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
    } else {
      this.setState({ user: this.props.user })
    }
  } 


  render() {
    if (this.props.isPreview) {
      const currentUser = Config.getCurrentUser()
      
      if (!currentUser) {
        return <Redirect to="/signin"/>
      } 

      if (currentUser && String(currentUser.id) !== this.props.match.params.username) {
        return <div>
          You are not authorized to view it
        </div>
      }
    }

    if (!this.state.user) return <div></div>

    const name = [this.state.user.first_name, this.state.user.last_name].join(" ") 
    const username = this.state.user.username
    const instagramLink = "instagram.com/" + username
    const isNotOnInstagram = this.state.user.is_ign

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className='user_avatar_container col-xs-12' >
              <img className='user_avatar' src={this.state.user.avatar || "/assets/default_avatar.png"} alt=""/>
              <div className="username">{name}</div>
              <div className="service_summary col-xs-12">
                <div className="location summary_item"><i className='fa fa-map-marker'></i>{this.formatLocation(this.state.user.location)}</div>
              </div>
              {
                username && !isNotOnInstagram &&
                  <a className="instagram_link" href={`https://${instagramLink}`} target="_blank">{instagramLink}</a>
              }
            </div>
          </div>
          <div className='row'>
            <BookForm user={this.state.user} />
            <Profile user={this.state.user} isPreview={this.props.isPreview} />
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

