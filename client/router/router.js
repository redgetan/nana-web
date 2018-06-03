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
import PostOAuth from './../components/Registration/PostOAuth'
import HomeScreen from './../screens/HomeScreen'
import PhotographerDirectoryScreen from './../screens/PhotographerDirectoryScreen'
import PhotographerScreen from './../screens/PhotographerScreen'
import UserProfileScreen from './../screens/UserProfileScreen'
import BookingScreen from './../screens/BookingScreen'
import EditProfileScreen from './../screens/EditProfileScreen'
import VerificationScreen from './../screens/VerificationScreen'
import MyServicesScreen from './../screens/MyServicesScreen'
import MyBookingsScreen from './../screens/MyBookingsScreen'
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

	onUserUpdated = (user) => {
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
	        <Route exact path='/post_oauth' render={ (props) => <PostOAuth onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
	        <Route exact path='/signin' render={ (props) => <Login onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
		      <Route exact path="/signup" render={ (props) => <Signup onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
		      <Route exact path="/partner/registration" component={PartnerRegisterScreen}/>
		      <Route exact path="/users/:username/book_request" component={BookingScreen}/>
		      <Route exact path="/users/:username" component={UserProfileScreen}/>
		      <Route exact path="/users/:username/preview_service" render={ (props) => <PhotographerScreen isPreview={true} {...props} /> } />
		      <Route exact path="/account/manage" render={ (props) => <EditProfileScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/verification" render={ (props) => <VerificationScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/services" render={ (props) => <MyServicesScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/bookings" render={ (props) => <MyBookingsScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/places/:address" component={PhotographerDirectoryScreen}/>
		      <Route exact path="/:username" component={UserProfileScreen}/>
		      <Route exact path="/" component={HomeScreen}/>
				</Switch>
			</div>
		)
	}
}