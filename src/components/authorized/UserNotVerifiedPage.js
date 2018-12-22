import React from 'react';
import UserVerificationButton from '../UserVerificationButton';

export default class UserNotVerifiedPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>User unverified</h1>
                <UserVerificationButton />
            </div>
        );
    }
}
