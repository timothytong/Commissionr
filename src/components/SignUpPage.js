import React from 'react';
import axios from 'axios';

export default class SignUpPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    email: '',
		    username: '',
		    password: '',
		    confirmedPassword: '',
		    errorMessage: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreateAccountButtonClicked = this.handleCreateAccountButtonClicked.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleCreateAccountButtonClicked() {
		if (this.state.password !== this.state.confirmedPassword) {
			this.setState({errorMessage: 'Passwords do not match.'});
		} else if (this.state.password.length < 6) {
			this.setState({errorMessage: 'Passwords must be at least six characters.'});
		} else {
			axios.post('http://localhost:3000/api/v1/user/create', {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
			})
			.then((response) => {
				console.log(response);
				this.setState({email: '', username: '', password: ''});
				this.props.history.push('/', { message: 'User successfully created.' });
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}

	

  	render() {
	    return (
	        <div>
	        	{this.state.errorMessage.length > 0 ? <p>{this.state.errorMessage}</p> : ""}
	        	<h4>Email:</h4>
                <input onChange={this.handleChange} type="text" name="email" />
				<h4>Username:</h4>
                <input onChange={this.handleChange} type="text" name="username" />
				<h4>Password:</h4>
                <input onChange={this.handleChange} type="password" name="password" />
                <h4>Confirm Password:</h4>
                <input onChange={this.handleChange} type="password" name="confirmedPassword" />
				<button type="button" onClick={this.handleCreateAccountButtonClicked}>Create account</button>
			</div>
	    );
  	}
}