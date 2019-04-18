import {DOMAIN_URL} from '../../../utils/Constants';

import React from 'react';
import axios from 'axios';

export default class MerchantCommissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            merchantCommissions: [],
            error: false,     
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/${this.props.userId}/merchant-commissions`)
        .then((response) => {
            if (response.status === 200 || response.status === 304) {
                this.setState({ merchantCommissions: response.data.commissions });
            }
            this.setState({loading: false});
        }).catch((error) => {
            this.setState({loading: false, error: true});
            console.log(error);
        });
    }

    render() {
        return (
            <ul>
                { this.state.loading ? <li>Loading</li> : this.state.merchantCommissions.map((commission) => {
                    return <li key={Math.random()}>{commission.id}-${commission.final_price}-{commission.position_in_queue}</li>
                })}
            </ul>
        );
    }
}
