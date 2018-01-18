import React from 'react';
import axios from 'axios';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutButtonClicked = this.handleLogoutButtonClicked.bind(this);
        this.handleLoginButtonClicked = this.handleLoginButtonClicked.bind(this);
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