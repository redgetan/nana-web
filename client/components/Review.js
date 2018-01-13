import React, { Component } from 'react'

export default class Review extends Component {

  render() {
    return (
      <div className="review_container">
        <div className="review_top_section">
          <img className="reviewer_avatar" src={this.props.review.reviewer.avatar} />
          <div className="reviewer_name">
            {this.props.review.reviewer.name}
          </div>
          <div className="review_created_at">
            {this.props.review.created_at}
          </div>
        </div>
        <div className="review_bottom_section">
          {this.props.review.text}
        </div>
      </div>

    )
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }
  
}
