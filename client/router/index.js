import React, { Component } from 'react'

import {
  Route,
  Link
} from 'react-router-dom'

import Home from './../components/Home'
import About from './../components/About'
import PhotoShoot from './../screens/PhotoShoot'


export default class AppRouter extends Component {
	render() {
		return (
			<div>
	      <Route exact path="/" component={PhotoShoot}/>
	      <Route exact path="/messages" component={Home}/>
	      <Route exact path="/about" component={About}/>
			</div>
		)
	}
}