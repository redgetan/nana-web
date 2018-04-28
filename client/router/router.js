import React, { Component } from 'react'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import About from './../components/Home/About'
import Faq from './../components/Home/Faq'
import Signup from './../components/Registration/Signup'
import Login from './../components/Registration/Login'
import HomeScreen from './../screens/HomeScreen'
import PhotographerDirectoryScreen from './../screens/PhotographerDirectoryScreen'
import PhotographerScreen from './../screens/PhotographerScreen'
import BookingScreen from './../screens/BookingScreen'
import EditProfileScreen from './../screens/EditProfileScreen'
import ManagePhotosScreen from './../screens/ManagePhotosScreen'
import PartnerRegisterScreen from './../screens/PartnerRegisterScreen'


export default class AppRouter extends Component {
	render() {
		return (
			<div>
				<Switch>
		      <Route exact path="/about" component={About}/>
		      <Route exact path="/faq" component={Faq}/>
	        <Route exact path='/signin' component={Login}/>
		      <Route exact path="/signup" component={Signup}/>
		      <Route exact path="/partner/registration" component={PartnerRegisterScreen}/>
		      <Route exact path="/users/:username/book/:step" component={BookingScreen}/>
		      <Route exact path="/users/:username" component={PhotographerScreen}/>
		      <Route exact path="/account/manage" component={EditProfileScreen}/>
		      <Route exact path="/account/manage/photos" component={ManagePhotosScreen}/>
		      <Route exact path="/places/:address" component={PhotographerDirectoryScreen}/>
		      <Route exact path="/" component={HomeScreen}/>
				</Switch>
			</div>
		)
	}
}