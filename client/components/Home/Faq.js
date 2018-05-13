import React, { Component } from 'react';

export default class Faq extends Component {
  render() {
    return (
      <div className="container faq_container">
        <h1>Frequently Asked Questions</h1>
        <ul>
          <li className="faq_item_container">
            <div className='question'>What is nana?</div>
            <p>Nana is a platform that matches people who want better dating profile pictures with photographers who understands what works best in a dating app. </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>Why did you create this service?</div>
            <p>Because your tinder/okcupid/bumble selfies suck. And we can make you look 10x more interesting. </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How are the Photographers chosen?</div>
            <p>We're currently in alpha, and allow anyone to signup as a photogapher. While we currently dont have a review process, this might change in future to ensure quality .</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>Are you available in my city?</div>
            <p>Anyone from around the world can sign up as a photographer. So no photographers are currently available in your city but you know some photographers who might be interested, feel free to refer them to our site :)  </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How much does it cost?</div>
            <p>Each photographer have their own rate. As of now, we're making it open. A $99 package could typically give you 20 photos in 2 location for about an hour. We might add option for photographers to create their own packages that people can instantly book for.  </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How long does a session take?</div>
            <p>It could be as short as 30min or as long as 3 hours, depending on your arrangement with the photographer.</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>What do i have to bring?</div>
            <p>Its generally a good idea to bring a few different wardrobes/shirts to diversity your look</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>Can i go to different locations/venues?</div>
            <p>If time permits and agreed upon earlier, you can visit more than 1 location with your photographer</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How do I become a photographer?</div>
            <p>We are accepting signups to be a photographer in our platform</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>I have more questions, how can i contact you?</div>
            <p>You can send as an email at <a href="mailto:info@nanapx.com">info@nanapx.com</a></p>
          </li>
        </ul>

      </div>
    )
  }
}
