import React, { Component } from 'react'

import Lightbox from 'react-images'


export default class Gallery extends Component {

  state = {
    images: [],
    lightboxIsOpen: false,
    currentImage: 0
  }

  constructor(props) {
    super(props)

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  openLightbox (index, event) {
    event.preventDefault()

    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    })
  }

  gotoPrevious() {
    this.setState({currentImage: this.state.currentImage - 1})
  }

  gotoImage (index) {
    this.setState({
      currentImage: index,
    })
  }

  gotoNext() {
    this.setState({currentImage: this.state.currentImage + 1})
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })  
  }

  handleClickImage () {
    if (this.state.currentImage === this.state.images.length - 1) return

    this.gotoNext()
  }

  render() {
    return (
      <div className="user_gallery_container">
        <Lightbox
          images={this.props.images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          backdropClosesModal={true}
          showThumbnails={true}
        />

        {
          this.props.images.map((image, index) => (
            <img className="user_gallery_photo" key={index} src={image.src} alt=""/>
          ))
        }
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
}
