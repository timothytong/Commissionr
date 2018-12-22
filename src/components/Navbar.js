import {DOMAIN_URL} from '../utils/Constants';

import React from 'react';
import axios from 'axios';

import UserVerificationButton from './UserVerificationButton';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutButtonClicked = this.handleLogoutButtonClicked.bind(this);
        this.handleLoginButtonClicked = this.handleLoginButtonClicked.bind(this);
        this.handleEditProfileButtonClicked = this.handleEditProfileButtonClicked.bind(this);
    }

    handleLogoutButtonClicked(e) {
        axios.get(`${DOMAIN_URL}/api/v1/user/logout`)
        .then((response) => {
            console.log(response);
            this.props.setAuthentication(false);
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleLoginButtonClicked(e) {
        this.props.history.replace('/');
    }

    handleEditProfileButtonClicked(e) {
        this.props.history.push('/updateprofile');
    }

    render() {
        const userInfo = <span>{this.props.user.display_name}</span>;

        const loginOutButton = (
           <button type="button" onClick={this.handleLogoutButtonClicked}>
               Logout
           </button>
        );

        const editProfileButton = (
            <button type="button" onClick={this.handleEditProfileButtonClicked}>
                Edit profile
            </button>
        );

        return (
            <div>
                {this.props.user.is_verified ? null : <UserVerificationButton />}
                {userInfo}
                {loginOutButton}
                {editProfileButton}
            </div>
        );

    }
}
