import React from 'react';
import axios from 'axios';

export default class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);
    }

    handleDeleteButtonClicked() {
        axios.delete('http://localhost:3000/api/v1/post/delete/' + this.props.postId)
        .then((response) => {
            if (response.status === 200 || response.status === 202) {
                this.props.deletePost(this.props.postIndex);
                console.log('Successfully deleted.');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.handleDeleteButtonClicked}>Delete</button>
            </div>
        );
    }
    
}