import {DOMAIN_URL} from '../utils/Constants';

import React from 'react';
import axios from 'axios';

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
        let loginOutButton = (
           <button type="button" onClick={this.handleLoginButtonClicked}>
               Login
           </button>
        );
        let editProfileButton = null;
        let userInfo = null;

        if (this.props.authenticated) {
            userInfo = <span>{this.props.user.display_name}</span>;
            loginOutButton = (
               <button type="button" onClick={this.handleLogoutButtonClicked}>
                   Logout
               </button>
            );
            editProfileButton = (
                <button type="button" onClick={this.handleEditProfileButtonClicked}>
                    Edit profile
                </button>
            );
        }

        return (
            <div>
                {userInfo}
                {loginOutButton}
                {editProfileButton}
            </div>
        );

    }
}
