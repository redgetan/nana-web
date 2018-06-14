import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/router';
import Config from './config/config';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {StripeProvider} from 'react-stripe-elements';

const App = () => {
  return (
    <StripeProvider apiKey={Config.getStripePublicKey()}>
      <Router history={browserHistory}>
        <AppRouter />
      </Router>
    </StripeProvider>
  )
}

const main = () => {
  window.browserHistory = createBrowserHistory()

  ReactDOM.render(<App />, document.getElementById('root'))

  browserHistory.listen((location) => {
    if (typeof gtag === "undefined") return
      
    gtag('config', GA_TRACKING_ID, {
      'page_title': document.title,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    })
  })

  /* integrate regular html with react */
  document.querySelector("a.brand_logo").addEventListener("click", (event) => {
    event.preventDefault()
    browserHistory.push("/")
    renderNavbar()
  })

  document.querySelector(".about_btn").addEventListener("click", (event) => {
    event.preventDefault()
    browserHistory.push("/about")
    renderNavbar()
  })

  $(".faq_btn").on("click", (event) => {
    event.preventDefault()
    browserHistory.push("/faq")
    renderNavbar()
  })

  $(".signup_btn, .become_photographer_btn").on("click", (event) => {
    event.preventDefault()
    browserHistory.push("/signup")
    renderNavbar()
  })

  $(".login_btn").on("click", (event) => {
    event.preventDefault()
    browserHistory.push("/signin")
    renderNavbar()
  })

  document.querySelector(".home_logout_btn").addEventListener("click", (event) => {
    event.preventDefault()
    Config.clearCredentials()
    browserHistory.push("/")
    renderNavbar()
  })

  document.querySelector(".edit_profile_btn").addEventListener("click", (event) => {
    event.preventDefault()
    browserHistory.push("/account/manage")
  })

  window.renderNavbar = () => {
    if (Config.isSignedIn()) {
      document.querySelector(".login_btn").style.display = 'none'
      document.querySelector(".signup_btn").style.display = 'none'
      document.querySelector(".become_photographer_btn").style.display = 'none'
      document.querySelector(".home_user_menu").dataset.shown = 'true'
    } else {
      document.querySelector(".login_btn").style.display = 'block'
      document.querySelector(".signup_btn").style.display = 'block'
      document.querySelector(".become_photographer_btn").style.display = 'block'
      document.querySelector(".home_user_menu").dataset.shown = ''
    }
  }

  renderNavbar()

  window.AccountKit_OnInteractive = () => {
    AccountKit.init(
      {
        appId:"813391282196047", 
        state:"changeme", 
        version:"v1.0",
        fbAppEventsEnabled: true,
        display:"modal"
      }
    );
  };

}

main()
