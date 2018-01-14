import React, { Component } from 'react'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Home from './../components/Home'
import About from './../components/About'
import Signup from './../components/Signup'
import Login from './../components/Login'
import UserDirectoryScreen from './../screens/UserDirectoryScreen'
import PhotographerScreen from './../screens/PhotographerScreen'
import BookingScreen from './../screens/BookingScreen'
import EditProfileScreen from './../screens/EditProfileScreen'


export default class AppRouter extends Component {
	render() {
		return (
			<div>
				<Switch>
		      <Route exact path="/messages" component={Home}/>
		      <Route exact path="/about" component={About}/>
	        <Route exact path='/signin' component={Login}/>
		      <Route exact path="/signup" component={Signup}/>
		      <Route exact path="/:username/book/:step" component={BookingScreen}/>
		      <Route exact path="/:username" component={PhotographerScreen}/>
		      <Route exact path="/account/manage" component={EditProfileScreen}/>
		      <Route exact path="/" component={UserDirectoryScreen}/>
				</Switch>
			</div>
		)
	}
}