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
		    additionalAttrs: [],
		    post: {},
		    isEditing: false,
		    isEditingLocation: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreatePostButtonClicked = this.handleCreatePostButtonClicked.bind(this);
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
		this.handleCreateNewAttributeClicked = this.handleCreateNewAttributeClicked.bind(this);
		this.handleDeleteAttribute = this.handleDeleteAttribute.bind(this);
		this.handleAttributeChange = this.handleAttributeChange.bind(this);
		this.handleChangeLocationClicked = this.handleChangeLocationClicked.bind(this);
		this.onSuggestSelect = this.onSuggestSelect.bind(this);
		this.handleChangeLocationConfirmClicked = this.handleChangeLocationConfirmClicked.bind(this);
	}

	componentDidMount() {
		if (!!this.props.location.state && !!this.props.location.state.post) {
			const post = this.props.location.state.post;
			const additionalAttrs = [ ...post.additional_attributes ];
			const postId = post.id;
			delete post.id;
			delete post.additional_attributes;
			post.formattedAddress = post.formatted_address;
			delete post.formatted_address;
			delete post.submitter_user_id;
			post.lastSeen = post.last_seen;
			delete post.last_seen;
			const datePicker = moment(post.lastSeen);
			this.setState({ 
				post: post, 
				postId: postId,
				additionalAttrs: additionalAttrs, 
				datePicker: datePicker, 
				isEditing: true,
				previousLat: post.latitude,
		    	previousLng: post.longitude,
		    	previousAddress: post.formattedAddress,
			});
		}
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
		updatedPost.lastSeen = date.format('MM/DD/YYYY');
    	this.setState({ post: updatedPost, datePicker: date });
  	}

	handleCreatePostButtonClicked() {
		const data = { ...this.state.post };
		data.additionalAttributes = this.state.additionalAttrs;
		if (this.state.isEditing === true) {
			axios.post('http://localhost:3000/api/v1/post/edit/' + this.state.postId, data)
	        .then((response) => {
	            if (response.status === 200 || response.status === 201) {
	                console.log('Successfully edited.');
	                this.props.history.push('/', { message: response.data.message });
	            }
	        })
	        .catch((error) => {
	            console.log(error);
	            this.setState({ errorMessage: error.response.data.error.replace(/notNull Violation: /g,"")});
	        });
		} else {
			axios.post('http://localhost:3000/api/v1/post/create/', data)
	        .then((response) => {
	            if (response.status === 200 || response.status === 201) {
	                console.log('Successfully created.');
	                this.props.history.push('/', { message: response.data.message });
	            }
	        })
	        .catch((error) => {
	            console.log(error);
	            this.setState({ errorMessage: error.response.data.error.replace(/notNull Violation: /g,"")});
	        });
		}
	}

	onSuggestSelect(suggest) {
		if (suggest.location.lat !== 0 || suggest.location.lng !==0){
			const updatedPost = { ...this.state.post };
			updatedPost.latitude = suggest.location.lat;
			updatedPost.longitude = suggest.location.lng;
		    this.setState({ post: updatedPost, pendingFormattedAddress: suggest.description });
		}
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

	handleChangeLocationClicked(e) {
		if (this.state.isEditingLocation) {
			const post = { ...this.state.post }
			post.latitude = this.state.previousLat;
			post.longitude = this.state.previousLng;
			post.formattedAddress = this.state.previousAddress;
			this.setState({ post: post });
		}
		this.setState({ isEditingLocation: !this.state.isEditingLocation });
	}

	handleChangeLocationConfirmClicked(e) {
		const post = { ...this.state.post };
		post.formattedAddress = this.state.pendingFormattedAddress;
		this.setState({ 
			previousLat: post.latitude, 
			previousLng: post.longitude, 
			previousAddress: post.formattedAddress,
			isEditingLocation: false,
			post: post,
		});
	}

  	render() {
  		let locationField = '';
  		if (!this.state.isEditing || this.state.isEditingLocation) {
  			locationField = (
		        <Geosuggest
		            ref={el=>this._geoSuggest=el}
		            placeholder="Location"
		            onSuggestSelect={this.onSuggestSelect}
		            location={new google.maps.LatLng(0, 0)}
		            radius="20" 
		        />
  			);
  		} else {
  			locationField = (
  				<h6>{this.state.post.formattedAddress}</h6> 
  			)
  		}
  		let editLocationButton = '';
  		if (!this.state.isEditingLocation && this.state.isEditing) {
  			editLocationButton = (
				<button type="button" onClick={this.handleChangeLocationClicked}>Edit Location</button>
  			);
  		} else if (this.state.isEditingLocation && this.state.isEditing) {
			editLocationButton = (
				<button type="button" onClick={this.handleChangeLocationClicked}>Cancel</button>
  			);
  		}
  		let confirmButton = '';
  		if (this.state.isEditingLocation && this.state.isEditing) {
  			confirmButton = (
  				<button type="button" onClick={this.handleChangeLocationConfirmClicked}>Confirm</button>
  			);
  		}
	    return (
	        <div>
	        	<h1>{this.state.isEditing ? 'Edit Post' : 'New Post Page'}</h1>
	        	<div>
	        		{this.state.errorMessage.length > 0 ? <p>{this.state.errorMessage}</p> : ""}
		        	<h6>Name: </h6> 
		        	<input onChange={this.handleChange} type='text' name='name' value={this.state.post.name}/>
		        	<h6>Last Seen: </h6>
		        	<DatePicker selected={this.state.datePicker} onChange={this.handleDatePickerChange}/>
		        	<h6>Reward: </h6>
		        	<input onChange={this.handleChange} type='text' name='reward' value={this.state.post.reward}/>
		        	<div>
		        		<h6>Location: </h6>
		        		{locationField}
		        		{editLocationButton}
		        		{confirmButton}
		        	</div>
		        	<h6>Contact: </h6>
		        	<input onChange={this.handleChange} type='text' name='contact' value={this.state.post.contact}/>
		        	<h6>Description: </h6>
		        	<input onChange={this.handleChange} type='text' name='description' value={this.state.post.description}/>
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
	        	<button type="button" onClick={this.handleCreatePostButtonClicked}>{this.state.isEditing ? 'Update' : 'Post'}</button>
			</div>
	    );
  	}
  	
}

