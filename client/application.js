import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/router';
import Config from './config/config';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const App = () => {
  return (
    <Router history={browserHistory}>
      <AppRouter />
    </Router>
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

  $(document).on("click", (event) => {
    const isNotNavBar = $(event.target).closest(".navbar-nav").length === 0
    if (isNotNavBar) {
      $('.collapse').collapse('hide')
    }
  })

  $(".explore_btn").on("click", (event) => {
    event.preventDefault()
    browserHistory.push("/")
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

  $(".home_logout_btn").on("click", (event) => {
    event.preventDefault()
    Config.clearCredentials()
    browserHistory.push("/")
    renderNavbar()
  })

  $(".edit_profile_btn").on("click", (event) => {
    event.preventDefault()
    browserHistory.push("/account/manage")
  })

  window.renderNavbar = () => {
    window.scrollTo(0, 0)

    if (Config.isSignedIn()) {
      document.querySelector(".login_btn").style.display = 'none'
      document.querySelector(".signup_btn").style.display = 'none'
      document.querySelector(".explore_btn").style.display = 'block'
      document.querySelector(".become_photographer_btn").style.display = 'none'
      document.querySelectorAll(".home_user_menu_desktop").forEach((el) => { el.dataset.shown = 'true' })
      document.querySelectorAll(".home_user_menu_mobile").forEach((el) => { el.dataset.shown = 'true' })
    } else {
      document.querySelector(".login_btn").style.display = 'block'
      document.querySelector(".signup_btn").style.display = 'block'
      document.querySelector(".explore_btn").style.display = 'none'
      document.querySelector(".become_photographer_btn").style.display = 'block'
      document.querySelectorAll(".home_user_menu_desktop").forEach((el) => { el.dataset.shown = '' })
      document.querySelectorAll(".home_user_menu_mobile").forEach((el) => { el.dataset.shown = '' })
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
