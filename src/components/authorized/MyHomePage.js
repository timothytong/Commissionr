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
            user: null,
            error: false,
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
        .then((response) => {
            if (response.status === 200 || response.status === 304) {
                this.setState({ authenticated: true, user: response.data.user });
            }
            this.setState({loading: false});
        })
        .catch((error) => {
            this.setState({ loading: false, errorMessage: 'User not found', error: true });
            console.log(error);
            this.props.history.push('/');
        });
    }

    render() {
        let commissionList = this.state.loading ? <p>Loading</p> : <CustomerCommissionList userId={this.state.user.id}/>;
        let errorMessage = '';

        if (this.state.errorMessage.length > 0) {
            errorMessage = <p>{this.state.errorMessage}</p>;
            commissionList = <p>Error</p>;
        } else if (this.props.location.state) {
            errorMessage = <p>{this.props.location.state.message}</p>;
        }

        return (
            <div>
                {errorMessage}
                <h1>Home</h1>
                {commissionList}
            </div>
        );
    }
}
