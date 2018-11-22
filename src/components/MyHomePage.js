import {DOMAIN_URL} from '../utils/Constants';

import React from 'react';
import axios from 'axios';

import Navbar from './Navbar';
import PostsList from './PostsList';
import NewPostButton from './NewPostButton';
import UserVerificationButton from './UserVerificationButton';

export default class MyHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorMessage: '',
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
        .then((response) => {
        	this.setState({loading: false});
            if (response.status === 200 || response.status === 304) {
                this.setState({authenticated: true});
            }
        })
        .catch((error) => {
            console.log(error);
            this.props.history.push('/');
        });
    }

    render() {
  		let errorMessage = '';

  		if (this.state.errorMessage.length > 0) {
  			errorMessage = <p>{this.state.errorMessage}</p>;
  		} else if (!!this.props.location.state) {
  			errorMessage = <p>{this.props.location.state.message}</p>;
		}

        if (this.state.authenticated && !this.state.loading) {
            return (
                <div>
                    <UserVerificationButton />
                	<Navbar history={this.props.history} authenticated={this.state.authenticated}/>
                    {errorMessage}
                    <PostsList postsEditable={true}/>
                    <NewPostButton history={this.props.history}/>
                </div>
            );
        } else if (!this.state.authenticated) {
            return (
                <div>
                    <h1>User not authenticated.</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        }

    }
}

