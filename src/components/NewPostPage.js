import React from 'react';
import axios from 'axios';

export default class NewPostPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		    errorMessage: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreatePostButtonClicked = this.handleCreatePostButtonClicked.bind(this);
	}

	handleChange(e) {
		if (e.target.type === 'checkbox') {
			this.setState({[e.target.name]: e.target.checked});
		} else {
			this.setState({[e.target.name]: e.target.value});
		}
	}

	handleCreatePostButtonClicked() {

	}

  	render() {
	    return (
	        <div>
	        	<h1>New Post Page</h1>
	        	<div>
		        	<h6>Name: </h6> 
		        	<input onChange={this.handleChange} type='text' name='name'/>
		        	<h6>Last Seen: </h6>
		        	<input onChange={this.handleChange} type='text' name='lastSeen'/>
		        	<h6>Reward: </h6>
		        	<input onChange={this.handleChange} type='text' name='reward'/>
		        	<h6>Longitude: </h6>
		        	<input onChange={this.handleChange} type='text' name='longitude'/>
		        	<h6>Latitude: </h6>
		        	<input onChange={this.handleChange} type='text' name='latitude'/>
		        	<h6>Contact: </h6>
		        	<input onChange={this.handleChange} type='text' name='contact'/>
		        	<h6>Description: </h6>
		        	<input onChange={this.handleChange} type='text' name='description'/>
		        	<h6>Species: </h6>
		        	<input onChange={this.handleChange} type='text' name='species'/>
		        	<h6>Breed: </h6>
		        	<input onChange={this.handleChange} type='text' name='breed'/>
		        	<h6>Aggressive: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='aggressive'/>
		        	<h6>Chip: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='chip'/>
		        	<button type="button" onClick={this.handleCreatePostButtonClicked}>Create post</button>
	        	</div>
			</div>
	    );
  	}
  	
}

