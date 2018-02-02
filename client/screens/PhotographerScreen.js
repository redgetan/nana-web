import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Profile'
import ReviewList from './../components/ReviewList'
import ReviewSubmit from './../components/ReviewSubmit'
import Gallery from './../components/Gallery'

export default class PhotographerScreen extends Component {

  state = {
    user: null,
    reviews: [],
    notFound: false
  }

  constructor(props) {
    super(props)

    this.onReviewCreatedHandler = this.onReviewCreated.bind(this)
  }

  componentDidMount() {
    window.c = this
    const username = this.props.match.params.username

    ClientAPI.getUser(username).then((res) => {
      if (res.body && res.body.error) {
        this.setState({ notFound: true })
      } else {
        this.setState({ user: res.body })
        this.setState({ reviews: res.body.reviews })
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
          <Gallery images={this.state.user.photos} />
          <Profile user={this.state.user} />
          <ReviewSubmit user={this.state.user} onReviewCreated={this.onReviewCreatedHandler}/>
          <ReviewList user={this.state.user} reviews={this.state.reviews} />
        </div>
      )
    }

    if (this.state.notFound) {
      return <div>User not found</div>
    }

    return <div></div>
  }
}

