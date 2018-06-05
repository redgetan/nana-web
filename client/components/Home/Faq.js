import React, { Component } from 'react';

export default class Faq extends Component {
  render() {
    return (
      <div className="container faq_container">
        <h1>Frequently Asked Questions</h1>
        <ul>
          <li className="faq_item_container">
            <div className='question'>What is nana?</div>
            <p>Nana is a marketplace that match affordable photographers with users looking to improve their social media content, dating profile, or business brand.  </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>Why did you create this service?</div>
            <p>Social Media when used properly can be powerful. You can make new connections, unlock new friendships, and enhance your dating life. The problem is that most people find it difficult to generate good content as a selfie camera can be a little restrictive. </p>
            <p>We want to make the power of social media accessible to the masses. By building a marketplace that allows anyone to access affordable quality photographers, one no longer needs to worry about good camera equipment, post processing, filters, or asking strangers to take photos of them only to be disappointed with the results. They just need to be themselves, and photographers can guide them, act as their personal buddy or coach, and take care of generating photos with proper angles, tone, and composition that's social media worthy.  </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How are the Photographers chosen?</div>
            <p>We're currently in alpha, and allow anyone to signup as a photogapher. While we currently dont have a review process, this might change in future to ensure quality .</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How much does it cost?</div>
            <p>Pricing starts from $10 per hour. This could be people who are just starting out and doesnt have much portfolio or reviews. People who have great portfolio will charge more. </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>Are you available in my city?</div>
            <p>Anyone from around the world can sign up as a photographer. So no photographers are currently available in your city but you know some photographers who might be interested, feel free to refer them to our site :)  </p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How long does a session take?</div>
            <p>It could be as short as 30min or as long as 3 hours, depending on your arrangement with the photographer.</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>How do I become a photographer?</div>
            <p>We are accepting signups to be a photographer in our platform</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>When do I get charged as a customer booking a photoshoot?</div>
            <p>You only get charged when a photographer accepts your request. If the schedule or distance restrictions doesnt allow it, and photographer can't fullfill your request, you won't be charged.</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>I want a refund or cancel a request. How do I do it? </div>
            <p>Send an email to <a href="mailto:info@nanapx.com">info@nanapx.com</a> with details regarding the refund or cancellation and will notify photographers and make the appropriate transactions. </p>
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
