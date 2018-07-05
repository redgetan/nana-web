import React, { Component } from 'react'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import About from './../components/Home/About'
import Faq from './../components/Home/Faq'
import PaymentPolicy from './../components/Home/PaymentPolicy'
import PrivacyPolicy from './../components/Home/PrivacyPolicy'
import Signup from './../components/Registration/Signup'
import Login from './../components/Registration/Login'
import PostOAuth from './../components/Registration/PostOAuth'
import HomeScreen from './../screens/HomeScreen'
import PhotographerDirectoryScreen from './../screens/PhotographerDirectoryScreen'
import PhotographerScreen from './../screens/PhotographerScreen'
import UserProfileScreen from './../screens/UserProfileScreen'
import BookingScreen from './../screens/BookingScreen'
import BookRequestScreen from './../screens/BookRequestScreen'
import EditProfileScreen from './../screens/EditProfileScreen'
import VerificationScreen from './../screens/VerificationScreen'
import MyServicesScreen from './../screens/MyServicesScreen'
import MyBookingsScreen from './../screens/MyBookingsScreen'
import PartnerRegisterScreen from './../screens/PartnerRegisterScreen'
import ForgotPasswordScreen from './../screens/ForgotPasswordScreen'
import Config from './../config/config'
import ClientAPI from './../api/client_api'


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

		  // reload user account data on first page load
			ClientAPI.getUserAccount().then((res) => {
	      if (res.body && res.body.error) return
				
	      this.onUserAuthenticated(res.body)
			})
		}
	}

	render() {
		return (
			<div>
				<Switch>
		      <Route exact path="/about" component={About}/>
		      <Route exact path="/faq" component={Faq}/>
		      <Route exact path="/privacy" component={PrivacyPolicy}/>
		      <Route exact path="/payment_policy" component={PaymentPolicy}/>
	        <Route exact path='/post_oauth' render={ (props) => <PostOAuth onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
	        <Route exact path='/signin' render={ (props) => <Login onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
		      <Route exact path="/signup" render={ (props) => <Signup onUserAuthenticated={this.onUserAuthenticated} {...props} /> } />
		      <Route exact path="/partner/registration" component={PartnerRegisterScreen}/>
		      <Route exact path="/users/:username/book" component={BookingScreen}/>
		      <Route exact path="/users/:username" component={UserProfileScreen}/>
		      <Route exact path="/users/:username/preview_service" render={ (props) => <PhotographerScreen isPreview={true} {...props} /> } />
		      <Route exact path="/forgot_password" render={ (props) => <ForgotPasswordScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/manage" render={ (props) => <EditProfileScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/verification" render={ (props) => <VerificationScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/services" render={ (props) => <MyServicesScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/account/bookings" render={ (props) => <MyBookingsScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/places/:address" component={PhotographerDirectoryScreen}/>
		      <Route exact path="/book_requests/:token" render={ (props) => <BookRequestScreen user={this.state.user} onUserUpdated={this.onUserUpdated} {...props} /> } />
		      <Route exact path="/:username" component={UserProfileScreen}/>
		      <Route exact path="/" component={HomeScreen}/>
				</Switch>
			</div>
		)
	}
}