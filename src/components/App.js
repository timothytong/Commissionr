import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import UserPostsPage from './UserPostsPage';
import SignUpPage from './SignUpPage';
import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
		        <Route exact path='/' component={LoginPage} />
		        <Route exact path='/homepage' component={UserPostsPage} />
		        <Route exact path='/signup' component={SignUpPage} />
		    </Switch>
		);
	}
}

/* LESSONS LEARNED
 * - Put all routes with corresponding paths under app.js
 */
