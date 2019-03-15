import {DOMAIN_URL} from '../../utils/Constants';

import React from 'react';
import axios from 'axios';

import Navbar from '../Navbar';
import UserVerificationButton from '../UserVerificationButton';

export default class MyHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorMessage: '',
            customerCommissions: [],
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
        .then((response) => {
            this.setState({loading: false});
            if (response.status === 200 || response.status === 304) {
                this.setState({ authenticated: true, user: response.data.user });
                axios.get(`${DOMAIN_URL}/api/v1/user/${response.data.user.id}/customer-commissions`)
                .then((response) => {
                    if (response.status === 200 || response.status === 304) {
                        this.setState({ customerCommissions: response.data.commissions });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
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
                <ul>
                    {this.state.customerCommissions.map((commission) => {
                        return <li key={Math.random()}>{commission.id}-${commission.final_price}-{commission.position_in_queue}</li>
                    })}
                </ul>
            </div>
        );
    }
}
