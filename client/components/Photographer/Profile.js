import React, { Component } from 'react'

export default class Profile extends Component {

  state = {
    reviews: []
  }

  render() {
    const profileClassName = (this.props.user.is_photographer || this.props.isPreview) ? "user_profile_summary photographer" : "user_profile_summary" 
    const priceLabel = this.props.user.price ? [this.props.user.price, this.props.user.currency].join(" ") : "$90-$200"

    return (
      <div className='user_profile_container col-xs-12 col-sm-7'>
        <div className={profileClassName}>
          <div className="summary_item hourly_rate_summary_item">
            <label>Hourly Rate</label>
            <span className="">{priceLabel}</span>
          </div>
          {
            this.props.user.cameras && 
              <div className="summary_item">
                <label>Camera</label>
                <span>{this.props.user.cameras}</span>
              </div>
          }
          {
            this.props.user.languages &&   
              <div className="summary_item">
                <label>Language</label>
                <span>{this.props.user.languages}</span>
              </div>
          }
        </div>
        <div className="user_bio">
          <h3>Bio</h3>
          <pre>{this.props.user.bio || "User has no bio"}</pre>
        </div>
        {
          this.props.user.expectation &&
            <div className="service_details">
              <h3>What we'll do</h3>
              <p>{this.props.user.expectation}</p>
            </div>
        }
      </div>
    )
  }

  componentDidMount() {
    /*
        <div className='header_2'>Availability</div>
        <div className='book_datepicker' ref={(el) => { this.datePicker = el }}>
        </div>
    */
    $(this.datePicker).datetimepicker({
      inline: true
    })
  }

  componentWillUnmount() {
    
  }
  
  _voteForLink = async () => {
    // ... you'll implement this in chapter 6  
  }

}
