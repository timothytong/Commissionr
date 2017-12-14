import React from 'react';
import axios from 'axios';

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    username: '',
		    password: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLoginButtonClicked = this.handleLoginButtonClicked.bind(this);
		this.handleNewUserClicked = this.handleNewUserClicked.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleLoginButtonClicked() {
		axios.post('http://localhost:3000/api/v1/user/login', {
			username: this.state.username,
			password: this.state.password,
		})
		.then((response) => {
			console.log(response);
			this.setState({username: '', password: ''});
            this.props.history.push('/homepage');
		})
		.catch((error) => {
			console.log(error);
		});
	}

	handleNewUserClicked() {
		this.setState({username: '', password: ''});
        this.props.history.push('/signup');
    }

  	render() {
	    return (
	        <div>
				<h4>Username:</h4>
                <input onChange={this.handleChange} type="text" name="username" />
				<h4>Password:</h4>
                <input onChange={this.handleChange} type="password" name="password" />
				<button type="button" onClick={this.handleLoginButtonClicked}>Login</button>
				<button type="button" onClick={this.handleNewUserClicked}>New User</button>
			</div>
	    );
  	}
}

// LESSONS LEARNED
// 1. Make sure bind all on(*) handles
// 2. on(*) handles come with event e, retrieve UI element with e.target
// 3. Doublecheck HTTP verb for each route used (GET? POST? PUT? PATCH? DELETE?)
