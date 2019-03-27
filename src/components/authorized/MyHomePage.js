import {DOMAIN_URL} from '../../utils/Constants';

import React from 'react';
import axios from 'axios';

import Navbar from '../Navbar';
import UserVerificationButton from '../UserVerificationButton';

import CustomerCommissionList from '../shared/uicomponents/CustomerCommissionList';

export default class MyHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorMessage: '',
            userId: '',
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
        .then((response) => {
            if (response.status === 200 || response.status === 304) {
                this.setState({ authenticated: true, userId: response.data.user.id });
            }
            this.setState({loading: false});
        })
        .catch((error) => {
            console.log(error);
            this.props.history.push('/');
        });
    }

    render() {
        let errorMessage = '';

        if (this.state.errorMessage.length > 0) {
            errorMessage = <p>{this.state.errorMessage}</p>;
        } else if (this.props.location.state) {
            errorMessage = <p>{this.props.location.state.message}</p>;
        }

        return (
            <div>
                {errorMessage}
                <h1>Home</h1>
                {!(this.state.loading) && <CustomerCommissionList userId={this.state.userId} />}
            </div>
        );
    }
}
