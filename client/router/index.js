import React, { Component } from 'react';

import {
  Route,
  Link
} from 'react-router-dom'

import Home from './../components/Home';
import About from './../components/About';


export default class AppRouter extends Component {
	render() {
		return (
			<div>
			  <Link to="/">Home</Link>
			  <Link to="/about">About</Link>
		    <div>
		      <Route exact path="/" component={Home}/>
		      <Route path="/about" component={About}/>
		    </div>
			</div>
		)
	}
}