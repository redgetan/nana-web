import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Profile'
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
          <Gallery images={this.state.user.photos} />
          <div className="container">
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

