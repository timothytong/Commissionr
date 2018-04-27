import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export default class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateButtonClicked = this.handleUpdateButtonClicked.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/v1/user/session')
        .then((response) => {
            if (response.status === 200 || response.status === 304) {
                this.setState({retrievedUsername: response.data.user_name, username: response.data.user_name, email: response.data.email});
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    handleUpdateButtonClicked() {
        const data = { ...this.state };
        if (this.state.retrievedUsername === this.state.username) {
            delete data.username;
        }
        axios.post('http://localhost:3000/api/v1/user/updateProfile', data)
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
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>Edit profile</h1>
                <h4>Username:</h4>
                <input onChange={this.handleChange} type="text" name="username" value={this.state.username}/>
                <h4>Email:</h4>
                <input onChange={this.handleChange} type="text" name="email" value={this.state.email}/>
                <button type="button" onClick={this.handleUpdateButtonClicked}>Update</button>
            </div>
        )   
    }
}