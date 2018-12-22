import React from 'react';

export default class NotFoundPage extends React.Component {

    componentDidMount() {
        this.props.history.push('/pagenotfound');
    }

    render() {
        return <div>404 Not Found</div>
    }

}


