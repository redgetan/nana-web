import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Slider from 'react-slick'

function PrevArrow(props) {
  const {className, style, onClick} = props

  return (
    <div
      className="left_slider carousel-control"
      onClick={onClick}
    >
      <span className="fa fa-angle-left carousel_icon_left" aria-hidden="true"></span>
    </div>
  )
}

function NextArrow(props) {
  const {className, style, onClick} = props

  return (
    <div
      className="right_slider carousel-control"
      onClick={onClick}
    >
      <span className="fa fa-angle-right carousel_icon_right" aria-hidden="true"></span>
    </div>
  )
}

export default class PhotoSlider extends Component {
  settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  }

  componentDidMount() {
    // $(this.carouselEl).carousel({ interval: false })
  }

  render () {

    return (
      <Slider {...this.settings}>
        {
          this.props.photos.map((photo, index) => (
            <Link to={`/users/${this.props.userId}`} key={index}>
              <img className="home_sample_photo" key={index} src={photo.src} alt=""/>
            </Link>
          ))
        }
      </Slider>
    )

    const carouselId   =  "carousel-" + this.props.userId
    const carouselHref =  "#" + carouselId

    return (
      <div id={carouselId} className="carousel slide" ref={(el) => { this.carouselEl = el }}>
        <div className="carousel-inner" role="listbox">
          {
            this.props.photos.map((photo, index) => (
              <div key={index} className={index === 0 ? 'item active' : 'item'}>
                <Link to={`/users/${this.props.userId}`}>
                  <img className="home_sample_photo" src={photo.src} alt=""/>
                </Link>
              </div>
            ))
          }
        </div>
        <a className="left carousel-control" href={carouselHref} role="button" data-slide="prev">
          <span className="fa fa-angle-left carousel_icon_left" aria-hidden="true"></span>
        </a>
        <a className="right carousel-control" href={carouselHref} role="button" data-slide="next">
          <span className="fa fa-angle-right carousel_icon_right" aria-hidden="true"></span>
        </a>
      </div>
    )
  }
}