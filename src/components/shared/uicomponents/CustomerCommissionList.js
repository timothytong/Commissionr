import {DOMAIN_URL} from '../../../utils/Constants';

import React from 'react';
import axios from 'axios';

export default class CustomerCommissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            customerCommissions: [],
        };
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/${this.props.userId}/customer-commissions`)
        .then((response) => {
            if (response.status === 200 || response.status === 304) {
                this.setState({ customerCommissions: response.data.commissions });
            }
            this.setState({loading: false});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <ul>
                {!(this.state.loading) && this.state.customerCommissions.map((commission) => {
                    return <li key={Math.random()}>{commission.id}-${commission.final_price}-{commission.position_in_queue}</li>
                })}
            </ul>
        );
    }
}
