import { DOMAIN_URL } from '../../utils/Constants';

import axios from 'axios';
import moment from 'moment';
import React from 'react';
import DatePicker from "react-datepicker";

export default class SignUpPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    confirmedPassword: '',
		    displayName: '',
            dob: moment(new Date()),
		    errorMessage: '',
		    password: '',
		    username: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreateAccountButtonClicked = this.handleCreateAccountButtonClicked.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleCreateAccountButtonClicked() {
		const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (!this.state.email) {
			this.setState({errorMessage: 'Email field is empty.'});
		} else if (!this.state.email.match(emailRegex)) {
			this.setState({errorMessage: 'Invalid email.'});
		} else if (this.state.username.length < 3) {
			this.setState({errorMessage: 'Username must be at least three characters.'});
		} else if (this.state.password !== this.state.confirmedPassword) {
			this.setState({errorMessage: 'Passwords do not match.'});
		} else if (this.state.password.length < 6) {
			this.setState({errorMessage: 'Password must be at least six characters.'});
		} else if (this.state.displayName.length < 1) {
			this.setState({errorMessage: 'Display name cannot be empty.'});
		} else {
			axios.post(`${DOMAIN_URL}/api/v1/user/create`, {
                displayName: this.state.displayName,
                dob: this.state.dob.format(),
				email: this.state.email,
				password: this.state.password,
				username: this.state.username,
			})
			.then((response) => {
				console.log(response);
				this.setState({ email: '', username: '', password: '' });
                window.localStorage.setItem('commissionrEmailVerification', this.state.email);
                this.props.setAuthentication(response.data.user);
				this.props.history.push('/emailverification');
			})
			.catch((error) => {
				console.log(error);
				this.setState({ errorMessage: error.response.data.message });
			});
		}
	}

    handleDatePickerChange(date) {
        this.setState({ dob: date });
    }

  	render() {
	    return (
	        <div>
	        	{this.state.errorMessage.length > 0 ? <p>{this.state.errorMessage}</p> : ""}
	        	<h4>Email:</h4>
                <input onChange={this.handleChange} type="text" name="email" />
				<h4>Username:</h4>
                <input onChange={this.handleChange} type="text" name="username" />
				<h4>Display Name:</h4>
                <input onChange={this.handleChange} type="text" name="displayName" />
				<h4>Password:</h4>
                <input onChange={this.handleChange} type="password" name="password" />
                <h4>Confirm Password:</h4>
                <input onChange={this.handleChange} type="password" name="confirmedPassword" />
                <h4>Date of Birth:</h4>
                <DatePicker
                    selected={this.state.dob}
                    onChange={this.handleDatePickerChange}
                />
                <button type="button" onClick={this.handleCreateAccountButtonClicked}>Create account</button>
			</div>
	    );
  	}
}
