import {Link} from 'react-router-dom';
import {DOMAIN_URL} from '../utils/Constants';

import axios from 'axios';
import React from 'react';

export default class EmailVerificationResultPage extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            loading: true,
            verificationSuccess: false,
        };
	}

    componentDidMount() {
        // Confirm the link is a sign-in with email link.
        let email = window.localStorage.getItem('commissionrEmailVerification');
        const href = window.location.href;
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }

        axios.put(`${DOMAIN_URL}/api/v1/user/verifyUser`, {email, href})
            .then((response) => {
                if (response.status === 200) {
                    console.log('Successfully flipped verified flag.');
                    // Clear email from storage.
                    window.localStorage.removeItem('commissionrEmailVerification');
                    this.setState({loading: false, verificationSuccess: true});
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false, verificationSuccess: false});
            });

    }

  	render() {
        if (this.state.loading) {
	        return (
	            <div>
		    		<h1>Verifying...</h1>
		    	</div>
	        );
        }
        if (this.state.verificationSuccess) {
            return (
                <div>
                    <h1>Verification succeeded, click <Link to='/'>here</Link> to log in.</h1>
                </div>
            );
        }
	    return (
	        <div>
				<h1>Verification failed, resend verification email</h1>
			</div>
	    );
  	}
}
