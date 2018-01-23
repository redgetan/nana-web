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
import HomeScreen from './../screens/HomeScreen'
import UserDirectoryScreen from './../screens/UserDirectoryScreen'
import PhotographerScreen from './../screens/PhotographerScreen'
import BookingScreen from './../screens/BookingScreen'
import EditProfileScreen from './../screens/EditProfileScreen'
import PartnerRegisterScreen from './../screens/PartnerRegisterScreen'


export default class AppRouter extends Component {
	render() {
		return (
			<div>
				<Switch>
		      <Route exact path="/messages" component={Home}/>
		      <Route exact path="/about" component={About}/>
	        <Route exact path='/signin' component={Login}/>
		      <Route exact path="/signup" component={Signup}/>
		      <Route exact path="/partner/registration" component={PartnerRegisterScreen}/>
		      <Route exact path="/users/:username/book/:step" component={BookingScreen}/>
		      <Route exact path="/users/:username" component={PhotographerScreen}/>
		      <Route exact path="/account/manage" component={EditProfileScreen}/>
		      <Route exact path="/" component={HomeScreen}/>
				</Switch>
			</div>
		)
	}
}