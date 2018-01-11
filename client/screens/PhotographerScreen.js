import React, { Component } from 'react'
import ClientAPI from './../api/client_api'
import Profile from './../components/Profile'
import ReviewList from './../components/ReviewList'

export default class PhotographerScreen extends Component {

  state = {
    user: null,
    notFound: false
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
          <ReviewList user={this.state.user} />

        </div>
      )
    }

    if (this.state.notFound) {
      return <div>User not found</div>
    }

    return <div></div>
  }
}

