import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MyHomePage from './MyHomePage';
import UserHomePage from './UserHomePage';
import SignUpPage from './SignUpPage';
import NewPostPage from './NewPostPage';
import EditProfilePage from './EditProfilePage';
import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
	render() {
		return (
			<Switch>
		        <Route exact path='/' component={LoginPage} />
		        <Route exact path='/home' component={MyHomePage} />
		        <Route exact path='/updateProfile' component={EditProfilePage} />
		        <Route exact path='/user/:username' component={UserHomePage} />
		        <Route exact path='/signup' component={SignUpPage} />
		        <Route exact path='/post/new' component={NewPostPage} />
		        <Route exact path='/post/edit' component={NewPostPage} />
		    </Switch>
		);
	}
}

/* LESSONS LEARNED
 * - Put all routes with corresponding paths under app.js
 */
