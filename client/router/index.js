import React, { Component } from 'react'

import {
  Route,
  Link
} from 'react-router-dom'

import Home from './../components/Home'
import About from './../components/About'
import Signup from './../components/Signup'
import UserScreen from './../screens/UserScreen'


export default class AppRouter extends Component {
	render() {
		return (
			<div>
	      <Route exact path="/messages" component={Home}/>
	      <Route exact path="/about" component={About}/>
	      <Route exact path="/signup" component={Signup}/>
	      <Route exact path="/" component={UserScreen}/>
			</div>
		)
	}
}