import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/index';
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjbjm5ifj0cf60172osy2g4lp' })

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </BrowserRouter>, 
document.getElementById('root'))