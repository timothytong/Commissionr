import React from 'react';
import axios from 'axios';
import {DOMAIN_URL} from '../utils/Constants';

import { Link } from 'react-router-dom';

export default class FoundPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
    }

    componentDidMount() {
        if (!this.props.location.state || !this.props.location.state.post) {
            this.props.history.push('/notFound', { message: "Post not found." });
        } else {
            const post = this.props.location.state.post;
            const postId = post.id;
            this.setState({postId: postId});
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmitButtonClicked() {
        const data = {username: this.state.username};
        axios.post(`${DOMAIN_URL}/api/v1/post/found/${this.state.postId}`, data)
            .then((response) => {
                if (response.status === 200) {
                    this.props.history.push('/', { message: response.data.message });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ errorMessage: error.response.data.message});
            });
    }

    render() {
        return (
            <div>
                {this.state.errorMessage.length > 0 ? <p>{this.state.errorMessage}</p> : ""}
                <h1>Finder's Username</h1>
                <input onChange={this.handleChange} type="text" name="username" />
                <button type="button" onClick={this.handleSubmitButtonClicked}>Submit</button>
            </div>
        );
    }
}
