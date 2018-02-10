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
		    	latitude: 15,
		    	longitude: 25,
		    },
		    additionalAttrs: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreatePostButtonClicked = this.handleCreatePostButtonClicked.bind(this);
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
		this.handleCreateNewAttributeClicked = this.handleCreateNewAttributeClicked.bind(this);
		this.handleDeleteAttribute = this.handleDeleteAttribute.bind(this);
		this.handleAttributeChange = this.handleAttributeChange.bind(this);
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
		const data = { ...this.state.post };
		data.additionalAttributes = this.state.additionalAttrs;
		axios.post('http://localhost:3000/api/v1/post/create/', data)
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

	handleCreateNewAttributeClicked() {
		const newAdditionalAttrs = [ ...this.state.additionalAttrs ];
		newAdditionalAttrs.push({ key: '', value: '' });
		this.setState({ additionalAttrs: newAdditionalAttrs });
	}

	handleDeleteAttribute(index) {
		const attributes = this.state.additionalAttrs.slice(0,index).concat(this.state.additionalAttrs.slice(index+1));
        this.setState({ additionalAttrs: attributes });
	}

	handleAttributeChange(e) {
		const newAdditionalAttrs = [ ...this.state.additionalAttrs ];
		const name = e.target.name;
		const parts = name.split('|');
		newAdditionalAttrs[parseInt(parts[0])][parts[1]] = e.target.value;
		this.setState({ additionalAttrs: newAdditionalAttrs });
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
			        <ul>	
			        	{this.state.additionalAttrs.map((attr, index) => 
	                        <li key={index}>
				        		<input value={attr.key} name={index + '|key'} onChange={this.handleAttributeChange} type='text'/>
				        		<input value={attr.value} name={index + '|value'} onChange={this.handleAttributeChange} type='text'/>
				        		<button type="button" onClick={() => this.handleDeleteAttribute(index)}>X</button>
				        	</li>
	                    )}
	                </ul>
		        	<button type="button" onClick={this.handleCreateNewAttributeClicked}>Add attribute</button>
	        	</div>
	        	<button type="button" onClick={this.handleCreatePostButtonClicked}>Create post</button>
			</div>
	    );
  	}
  	
}

