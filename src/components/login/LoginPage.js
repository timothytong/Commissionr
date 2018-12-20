import React from 'react';
import axios from 'axios';
import {DOMAIN_URL} from '../../utils/Constants';

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    username: '',
		    password: '',
		    errorMessage: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLoginButtonClicked = this.handleLoginButtonClicked.bind(this);
		this.handleNewUserClicked = this.handleNewUserClicked.bind(this);
	}

	componentDidMount() {
		axios.get(`${DOMAIN_URL}/api/v1/user/session`)
        .then((response) => {
            if (response.status === 200) {
            	this.props.history.push('/home');
            }
        })
        .catch((error) => {
			console.log(error);
		});
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleLoginButtonClicked() {
		axios.post(`${DOMAIN_URL}/api/v1/user/login`, {
			username: this.state.username,
			password: this.state.password,
		})
		.then((response) => {
			console.log(response);
			this.setState({username: '', password: ''});
            this.props.history.push('/home');
		})
		.catch((error) => {
			console.log(error);
			this.setState({ errorMessage: error.response.data.message });
		});
	}

	handleNewUserClicked() {
		this.setState({username: '', password: ''});
        this.props.history.push('/signup');
    }

  	render() {
  		let errorMessage = '';

  		if (this.state.errorMessage.length > 0) {
  			errorMessage = <p>{this.state.errorMessage}</p>;
  		} else if (!!this.props.location.state) {
  			errorMessage = <p>{this.props.location.state.message}</p>;
		}

	    return (
	        <div>
	        	{errorMessage}
				<h4>Username:</h4>
                <input onChange={this.handleChange} type="text" name="username" />
				<h4>Password:</h4>
                <input onChange={this.handleChange} type="password" name="password" />
				<button type="button" onClick={this.handleLoginButtonClicked}>Login</button>
				<button type="button" onClick={this.handleNewUserClicked}>Sign Up</button>
			</div>
	    );
  	}
}

// LESSONS LEARNED
// 1. Make sure bind all on(*) handles
// 2. on(*) handles come with event e, retrieve UI element with e.target
// 3. Doublecheck HTTP verb for each route used (GET? POST? PUT? PATCH? DELETE?)
