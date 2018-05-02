import React, { Component } from 'react'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import About from './../components/Home/About'
import Faq from './../components/Home/Faq'
import PrivacyPolicy from './../components/Home/PrivacyPolicy'
import Signup from './../components/Registration/Signup'
import Login from './../components/Registration/Login'
import HomeScreen from './../screens/HomeScreen'
import PhotographerDirectoryScreen from './../screens/PhotographerDirectoryScreen'
import PhotographerScreen from './../screens/PhotographerScreen'
import BookingScreen from './../screens/BookingScreen'
import EditProfileScreen from './../screens/EditProfileScreen'
import ManagePhotosScreen from './../screens/ManagePhotosScreen'
import PartnerRegisterScreen from './../screens/PartnerRegisterScreen'
import Config from './../config/config'


export default class AppRouter extends Component {

	// global app state
	state = { 
		user: null
	}

	onUserAuthenticated = (user) => {
		this.setState({ user: user })
	}

	componentWillMount() {
		const user = Config.getCurrentUser()
		if (user) {
			this.onUserAuthenticated(user)
		}
	}

	render() {
		return (
			<div>
				<Switch>
		      <Route exact path="/about" component={About}/>
		      <Route exact path="/faq" component={Faq}/>
		      <Route exact path="/privacy" component={PrivacyPolicy}/>
	        <Route exact path='/signin' render={ (props) => <Login onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
		      <Route exact path="/signup" render={ (props) => <Signup onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
		      <Route exact path="/partner/registration" component={PartnerRegisterScreen}/>
		      <Route exact path="/users/:username/book/:step" component={BookingScreen}/>
		      <Route exact path="/users/:username" component={PhotographerScreen}/>
		      <Route exact path="/account/manage" render={ (props) => <EditProfileScreen user={this.state.user} {...props} /> } />
		      <Route exact path="/account/manage/photos" render={ (props) => <ManagePhotosScreen user={this.state.user} {...props} /> } />
		      <Route exact path="/places/:address" component={PhotographerDirectoryScreen}/>
		      <Route exact path="/" component={HomeScreen}/>
				</Switch>
			</div>
		)
	}
}