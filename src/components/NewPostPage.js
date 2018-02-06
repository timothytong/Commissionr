import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Geosuggest from 'react-geosuggest';

export default class NewPostPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		    errorMessage: '',
		    post: {
		    	isAggressive: false,
		    	completedShots: false,
		    	hasChip: false,
		    },
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreatePostButtonClicked = this.handleCreatePostButtonClicked.bind(this);
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.onSuggestSelect = this.onSuggestSelect.bind(this);
	}

	handleChange(e) {
		const updatedPost = { ...this.state.post };
		if (e.target.type === 'checkbox') {
			updatedPost[e.target.name] = e.target.checked;
		} else {
			updatedPost[e.target.name] = e.target.value;
		}
		this.setState({ post: updatedPost });
	}

	handleDatePickerChange(date) {
		const updatedPost = { ...this.state.post };
		updatedPost.lastSeen = date;
    	this.setState({ post: updatedPost });
  	}

	handleCreatePostButtonClicked() {
		axios.post('http://localhost:3000/api/v1/post/create/', this.state.post)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                console.log('Successfully created.');
                this.props.history.push('/', { message: response.data.message });
            }
        })
        .catch((error) => {
            console.log(error);
        });
	}

	onSuggestSelect(suggest) {
	    this.setState({ position: suggest.location });
	    console.log(suggest);
	}

  	render() {
	    return (
	        <div>
	        	<h1>New Post Page</h1>
	        	<div>
		        	<h6>Name: </h6> 
		        	<input onChange={this.handleChange} type='text' name='name'/>
		        	<h6>Last Seen: </h6>
		        	<DatePicker selected={this.state.post.lastSeen} onChange={this.handleDatePickerChange}/>
		        	<h6>Reward: </h6>
		        	<input onChange={this.handleChange} type='text' name='reward'/>
		        	<div>
				        <Geosuggest
				            ref={el=>this._geoSuggest=el}
				            placeholder="Location"
				            onSuggestSelect={this.onSuggestSelect}
				            location={new google.maps.LatLng(53.558572, 9.9278215)}
				            radius="20" 
				        />
			      	</div>
		        	<h6>Contact: </h6>
		        	<input onChange={this.handleChange} type='text' name='contact'/>
		        	<h6>Description: </h6>
		        	<input onChange={this.handleChange} type='text' name='description'/>
		        	<h6>Species: </h6>
		        	<input onChange={this.handleChange} type='text' name='animal'/>
		        	<h6>Breed: </h6>
		        	<input onChange={this.handleChange} type='text' name='breed'/>
		        	<h6>Aggressive: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='isAggressive'/>
		        	<h6>Completed Shots: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='completedShots'/>
		        	<h6>Chip: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='hasChip'/>
		        	<button type="button" onClick={this.handleCreatePostButtonClicked}>Create post</button>
	        	</div>
			</div>
	    );
  	}
  	
}

