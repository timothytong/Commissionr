import {DOMAIN_URL} from '../../../utils/Constants';

import React from 'react';
import axios from 'axios';

export default class CustomerCommissionList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.customerCommissions.map((commission) => {
                    return <li key={Math.random()}>{commission.id}-${commission.final_price}-{commission.position_in_queue}</li>
                })}
            </ul>
        );
    }
}
