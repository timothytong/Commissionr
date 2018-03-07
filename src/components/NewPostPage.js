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
		    additionalAttrs: [],
		    isEditing: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCreatePostButtonClicked = this.handleCreatePostButtonClicked.bind(this);
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
		this.handleCreateNewAttributeClicked = this.handleCreateNewAttributeClicked.bind(this);
		this.handleDeleteAttribute = this.handleDeleteAttribute.bind(this);
		this.handleAttributeChange = this.handleAttributeChange.bind(this);
		this.onSuggestSelect = this.onSuggestSelect.bind(this);
	}

	componentDidMount() {
		if (!!this.props.location.state && !!this.props.location.state.post) {
			const post = this.props.location.state.post;
			const additionalAttrs = [ ...post.additional_attributes ];
			delete post.additional_attributes;
			post.hasChip = post.has_chip;
			delete post.has_chip;
			post.completedShots = post.completed_shots;
			delete post.completed_shots;
			post.isAggressive = post.is_aggressive;
			delete post.is_aggressive;
			delete post.submitter_user_id;
			const datePicker = moment(post.last_seen);
			this.setState({ 
				post: post, 
				additionalAttrs: additionalAttrs, 
				datePicker: datePicker, 
				isEditing: true,
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
		updatedPost.last_seen = date.format('MM/DD/YYYY');
    	this.setState({ post: updatedPost, datePicker: date });
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
            this.setState({ errorMessage: error.response.data.error.replace(/notNull Violation: /g,"")});
        });
	}

	onSuggestSelect(suggest) {
		if (suggest.location.lat !== 0 || suggest.location.lng !==0){
			const updatedPost = { ...this.state.post };
			updatedPost.latitude = suggest.location.lat;
			updatedPost.longitude = suggest.location.lng;
		    this.setState({ post: updatedPost });
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

  	render() {
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
				        <Geosuggest
				            ref={el=>this._geoSuggest=el}
				            placeholder="Location"
				            onSuggestSelect={this.onSuggestSelect}
				            location={new google.maps.LatLng(0, 0)}
				            radius="20" 
				        />
			      	</div>
		        	<h6>Contact: </h6>
		        	<input onChange={this.handleChange} type='text' name='contact' value={this.state.post.contact}/>
		        	<h6>Description: </h6>
		        	<input onChange={this.handleChange} type='text' name='description' value={this.state.post.description}/>
		        	<h6>Species: </h6>
		        	<input onChange={this.handleChange} type='text' name='animal' value={this.state.post.animal}/>
		        	<h6>Breed: </h6>
		        	<input onChange={this.handleChange} type='text' name='breed' value={this.state.post.breed}/>
		        	<h6>Aggressive: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='isAggressive' checked={this.state.post.isAggressive}/>
		        	<h6>Completed Shots: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='completedShots' checked={this.state.post.completedShots}/>
		        	<h6>Chip: </h6>
		        	<input onChange={this.handleChange} type='checkbox' name='hasChip' checked={this.state.post.hasChip}/>
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

