import React from 'react';

export default class NewPostButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewPostButtonClicked = this.handleNewPostButtonClicked.bind(this);
    }

    handleNewPostButtonClicked() {
        this.props.history.push('/post/new');
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.handleNewPostButtonClicked}>Create New Post</button>
            </div>
        );
    }
    
}