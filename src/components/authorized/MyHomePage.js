import {DOMAIN_URL} from '../../utils/Constants';

import React from 'react';
import axios from 'axios';

import Navbar from '../Navbar';
import UserVerificationButton from '../UserVerificationButton';

import CustomerCommissionList from '../shared/uicomponents/CustomerCommissionList';
import MerchantCommissionList from '../shared/uicomponents/MerchantCommissionList';

export default class MyHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorMessage: '',
            user: null,
            error: false,
            showCustomerList: true,
        };
        this.displayCommissions = this.displayCommissions.bind(this);
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

    displayCommissions(showCustomerList) {
        this.setState({showCustomerList});
    }

    render() {
        let commissionList = null;
        if (this.state.loading) {
            commissionList = <p>Loading</p>;
        } else if (this.state.showCustomerList) {
            commissionList = <CustomerCommissionList userId={this.state.user.id}/>;
        } else {
            commissionList = <MerchantCommissionList userId={this.state.user.id}/>;
        }
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
                <button onClick={() => this.displayCommissions(true)}>Customer</button>
                <button onClick={() => this.displayCommissions(false)}>Merchant</button>
                {commissionList}
            </div>
        );
    }
}
