import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {DOMAIN_URL} from '../utils/Constants';

export default class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldDisplayName: '',
            displayName: '',
            email: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateButtonClicked = this.handleUpdateButtonClicked.bind(this);
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
            .then((response) => {
                if (response.status === 200 || response.status === 304) {
                    const { user } = response.data;
                    this.setState({
                        oldDisplayName: user.display_name,
                        displayName: user.display_name,
                        email: user.email,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    handleUpdateButtonClicked() {
        const data = { ...this.state };
        if (this.state.oldDisplayName === this.state.displayName) {
            delete data.displayName;
        }
        axios.post(`${DOMAIN_URL}/api/v1/user/updateProfile`, data)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                console.log('Successfully edited.');
                this.props.history.push('/', { message: response.data.message });
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({ errorMessage: error.response.data.message });
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>Edit profile</h1>
                <h4>Display Name:</h4>
                <input onChange={this.handleChange} type="text" name="displayName" value={this.state.displayName}/>
                <button type="button" onClick={this.handleUpdateButtonClicked}>Update</button>
            </div>
        )
    }
}
