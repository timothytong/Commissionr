import React from 'react';
import axios from 'axios';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutButtonClicked = this.handleLogoutButtonClicked.bind(this);
        this.handleLoginButtonClicked = this.handleLoginButtonClicked.bind(this);
    }


    handleLogoutButtonClicked(e) {
        this.props.logout();
    }

    handleLoginButtonClicked(e) {
        this.props.login();
    }

    render() {
        let loginOutButton = (
           <button type="button" onClick={this.handleLoginButtonClicked}>
               Login
           </button>
        );

        if (this.props.authenticated) {
            loginOutButton = (
               <button type="button" onClick={this.handleLogoutButtonClicked}>
                   Logout
               </button>
            );
        }

        return (
            <div>
                {loginOutButton}
            </div>
        );

    }
}