import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/index';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


import { GC_USER_ID, GC_AUTH_TOKEN } from './config/config'

const currentUserId = localStorage.getItem(GC_USER_ID)

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjbjm5ifj0cf60172osy2g4lp' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

window.browserHistory = createBrowserHistory()

ReactDOM.render(
  <Router history={browserHistory}>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </Router>, 
document.getElementById('root'))



/* integrate regular html with react */
document.querySelector(".home_logout_btn").addEventListener("click", (event) => {
   localStorage.removeItem(GC_USER_ID)
   localStorage.removeItem(GC_AUTH_TOKEN)
   browserHistory.push("/")
})

if (currentUserId) {
  document.querySelector(".login_btn").style.display = 'none'
  document.querySelector(".signup_btn").style.display = 'none'
  document.querySelector(".home_user_menu").style.display = 'block'
}