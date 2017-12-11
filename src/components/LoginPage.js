import React from 'react';

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    username: '',
		    password: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

  	render() {
	    return (
	        <div>
		  		<h2>
		  			Hello, this is a header.	
		  		</h2>
		  		<h3> 
		  			And this is one too.
		  		</h3>
		 
				<h4>Username:</h4> <input onChange={this.handleChange} type="text" name="username"/>
				<h4>Password:</h4> <input onChange={this.handleChange} type="text" name="password"/>

				<button type="button">Click Me!</button> 
			</div>
	    );
  	}
}
