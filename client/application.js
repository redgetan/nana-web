import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/index';
import Config from './config/config';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

window.browserHistory = createBrowserHistory()

ReactDOM.render(
  <Router history={browserHistory}>
    <AppRouter />
  </Router>, 
document.getElementById('root'))

/* integrate regular html with react */
document.querySelector(".home_logout_btn").addEventListener("click", (event) => {
  Config.clearCredentials()
  browserHistory.push("/")
  renderNavbar()
})

document.querySelector(".edit_profile_btn").addEventListener("click", (event) => {
  browserHistory.push("/account/manage")
})

window.renderNavbar = () => {
  if (Config.isSignedIn()) {
    document.querySelector(".login_btn").style.display = 'none'
    document.querySelector(".signup_btn").style.display = 'none'
    document.querySelector(".home_user_menu").dataset.shown = 'true'
  } else {
    document.querySelector(".login_btn").style.display = 'block'
    document.querySelector(".signup_btn").style.display = 'block'
    document.querySelector(".home_user_menu").dataset.shown = ''
  }
}

renderNavbar()