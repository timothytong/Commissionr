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
        axios.get('http://localhost:3000/api/v1/user/logout')
        .then((response) => {
            console.log(response);
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleLoginButtonClicked(e) {
        this.props.history.push('/');
    }

    handleEditProfileButtonClicked(e) {
        this.props.history.push('/updateProfile');
    }

    render() {
        let loginOutButton = (
           <button type="button" onClick={this.handleLoginButtonClicked}>
               Login
           </button>
        );
        let editProfileButton = null;

        if (this.props.authenticated) {
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
                {loginOutButton}
                {editProfileButton}
            </div>
        );

    }
}