import React, { Component } from 'react';

export default class PaymentPolicy extends Component {
  render() {
    return (
      <div className="container faq_container">
        <h1>Payment Policy</h1>
        <ul>
          <li className="faq_item_container">
            <div className='question'>Payment Processing</div>
            <p>This Privacy Policy governs all data collection and usage by Nana, including through the Site.  By using the Site, you consent to the data collection and usage practices described in this Policy.</p>
          </li>
          <li className="faq_item_container">
            <div className='question'>Refund and Cancellation</div>
            <p>You can cancel a booking up to 1 day prior to photoshoot date. To cancel, simply send an email to info@nanapx.com, and we'll notify the photographer, and create a refund transaction. Similarly, if there are any disputes and you wish to have your payment refunded, send an email to address provided earlier.  </p>
          </li>
        </ul>

      </div>
    )
  }
}
