import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/index';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { GC_USER_ID, GC_AUTH_TOKEN } from './config/config'

const currentUserId = localStorage.getItem(GC_USER_ID)

window.browserHistory = createBrowserHistory()

ReactDOM.render(
  <Router history={browserHistory}>
    <AppRouter />
  </Router>, 
document.getElementById('root'))



/* integrate regular html with react */
document.querySelector(".home_logout_btn").addEventListener("click", (event) => {
   localStorage.removeItem(GC_USER_ID)
   localStorage.removeItem(GC_AUTH_TOKEN)
   browserHistory.push("/")
   renderNavbar()
})

window.renderNavbar = (currentUserId) => {
  if (currentUserId) {
    document.querySelector(".login_btn").style.display = 'none'
    document.querySelector(".signup_btn").style.display = 'none'
    document.querySelector(".home_user_menu").dataset.shown = 'true'
  } else {
    document.querySelector(".login_btn").style.display = 'block'
    document.querySelector(".signup_btn").style.display = 'block'
    document.querySelector(".home_user_menu").dataset.shown = ''
  }
}

renderNavbar(currentUserId)