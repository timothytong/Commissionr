import {DOMAIN_URL} from '../utils/Constants';

import React from 'react';
import axios from 'axios';

export default class UserVerificationButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleVerifyButtonClicked = this.handleVerifyButtonClicked.bind(this);
        this.state = {
            loading: true,
            verified: true,
            emailSent: false,
            error: false,
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/checkUserVerified`)
        .then((response) => {
            this.setState({loading: false, verified: response.data.is_verified});
        })
        .catch((error) => {
            this.setState({loading: false, verified: false});
        });
    }

    handleVerifyButtonClicked() {
        this.setState({error: false});
        axios.get(`${DOMAIN_URL}/api/v1/user/startVerification`)
        .then((response) => {
            if (response.status === 200) {
                console.log('Successfully sent verification email.');
                this.setState({emailSent: true});
            } else {
                this.setState({error: true});
                console.log('Unexpected!');
            }
        })
        .catch((error) => {
            this.setState({error: true});
            console.log(error);
        });
    }

    render() {
        if (this.state.loading || this.state.verified) return null;
        if (this.state.emailSent) {
            return (
                <div>
                    <h5>Verification email sent.</h5>
                </div>
            );
        }
        return (
            <div>
                User unverified, click to resend verification email.
                <button type="button" onClick={this.handleVerifyButtonClicked}>Resend</button>
                {this.state.error ? <h6>An error occurred, please try again later.</h6> : ''}
            </div>
        );
    }

}
