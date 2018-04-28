import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class FoundPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmitButtonClicked() {
        
        this.props.history.push('/');
    }

    componentDidMount() {

    }


    render() {
        return (
            <div>
                <h1>Finder's Username</h1>
                <input onChange={this.handleChange} type="text" name="username" />
                <button type="button" onClick={this.handleSubmitButtonClicked}>Submit</button>
            </div>
        );
    }
}