import { DOMAIN_URL } from '../utils/Constants';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import React from 'react';
import axios from 'axios';

import Navbar from './Navbar';
import LoginPage from './unauthorized/LoginPage';
import MyHomePage from './authorized/MyHomePage';
import UserHomePage from './authorized/UserHomePage';
import SignUpPage from './unauthorized/SignUpPage';
import NewPostPage from './NewPostPage';
import EditProfilePage from './authorized/EditProfilePage';
import EmailVerificationResultPage from './authorized/EmailVerificationResultPage';
import EmailVerificationPage from './authorized/EmailVerificationPage';
import FoundPage from './FoundPage';
import UserNotVerifiedPage from './authorized/UserNotVerifiedPage';
import NotFoundPage from './shared/NotFoundPage';

export default class NavigationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
        };
        this.setAuthentication = this.setAuthentication.bind(this);
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
        .then((response) => {
            if (response.status === 200 || response.status === 304) {
                this.setState({ authenticated: true, loading: false, user: response.data.user });
            } else {
                throw 'User unauthenticated';
            }
        })
        .catch((error) => {
            this.setState({ authenticated: false, loading: false });
        });
    }

    setAuthentication(user) {
        if (!user) {
            this.setState({ authenticated: false });
            return;
        }
        this.setState({ user, authenticated: true });
    }

    render() {
        if (this.state.authenticated) {
            return (
                <div>
                    <Navbar
                        history={this.props.history}
                        authenticated={true}
                        user={this.state.user}
                        setAuthentication={this.setAuthentication}
                    />
                    <Switch>
                        <Route exact path='/' component={MyHomePage} />
                        <Route exact path='/emailverification' component={EmailVerificationPage} />
                        <Route exact path='/verifyuser' component={EmailVerificationResultPage} />
                        <Route exact path='/unverifieduser' component={UserNotVerifiedPage} />
                        <Route exact path='/updateprofile'
                               render={(props) => <EditProfilePage setAuthentication={this.setAuthentication} { ...props } />}
                        />
                        <Route exact path='/user/:username' component={UserHomePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            );
        } else if (this.state.loading) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <Switch>
                        <Route exact path='/'
                               render={(props) => <LoginPage setAuthentication={this.setAuthentication} { ...props } />}
                        />
                        <Route exact path='/signup'
                               render={(props) => <SignUpPage setAuthentication={this.setAuthentication} { ...props } />}
                        />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            );
        }
    }

}

