import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Photographer/Profile'
import Gallery from './../components/Gallery'
import BookRequest from './../components/BookRequest'

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
    if (this.state.user) {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className='user_avatar_container col-xs-12' >
                <img className='user_avatar' src={this.state.user.avatar} alt=""/>
                <div className="username">{this.state.user.username}</div>
              </div>
              <div className="service_summary col-xs-12">
                <div className="location summary_item"><i className='fa fa-map-marker'></i>Toronto</div>
                <div className="camera_specs summary_item"><i className='fa fa-camera'></i>Nikon D800</div>
              </div>
            </div>
            <Gallery images={this.state.user.photos} />
            <Profile user={this.state.user} />
            <BookRequest />
          </div>
        </div>
      )
    }

    if (this.state.notFound) {
      return <div>User not found</div>
    }

    return <div></div>
  }
}

