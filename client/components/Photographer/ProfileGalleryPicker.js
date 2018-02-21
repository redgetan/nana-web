import React, { Component } from 'react'
import InstagramAPI from './../../api/instagram_api'

export default class GalleryPicker extends Component {
  state = {
    available_photos: []
  }

  render() {
    if (this.state.available_photos.length > 0) {
      return (
        <div className='user_gallery_picker'>
          {
            this.state.available_photos.map((photo) => (
              <img key={photo.id} src={photo.images.low_resolution.url} alt=""/>
            ))
          }          
        </div>
      )
    } 

    return (
      <div>
      </div>
    )
  }

  componentDidMount() {
    // InstagramAPI.getSelfMediaRecent().then((res) => {
    //   this.setState({ available_photos: res.body.data })
    // }).catch((err) => {

    // })
  }

  componentWillUnmount() {
  }
  
}
