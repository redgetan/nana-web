import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Profile'
import ReviewList from './../components/ReviewList'
import ReviewSubmit from './../components/ReviewSubmit'

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
          <h2></h2>Portfolio
          <ul className="user_photo_gallery">
            <li className="user_photo_gallery_item">
              <img src="https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/26065766_2070654376491787_4305470346464591872_n.jpg" alt=""/>
            </li>
            <li className="user_photo_gallery_item">
              <img src="https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/26071031_820844121428775_4690258145845444608_n.jpg" alt=""/>
            </li>
            <li className="user_photo_gallery_item">
              <img src="https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/25023579_1676334675759850_7649785668452745216_n.jpg" alt=""/>
            </li>
          </ul>

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

