import React from 'react';
import axios from 'axios';

export default class PostsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        let url = 'http://localhost:3000/api/v1/post/logged-in-userposts/';
        if (!!this.props.username) {
            url = 'http://localhost:3000/api/v1/post/userposts/' + this.props.username;
        }
        axios.get(url)
        .then((response) => {
            this.setState({loading: false, posts: response.data.data});
            console.log(response);
        })
        .catch((error) => {
            this.setState({loading: false});
            console.log(error);
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        } else if (!!this.state.posts) {
            return (
                <ul>
                    {this.state.posts.map((post, index) => 
                        <li key={index}>
                            {post.id}: looking for {post.name}
                            <ul>
                                {post.additional_attributes.map((attr, index) => 
                                    <li key={index}>
                                        {attr.key} => {attr.value}
                                    </li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            );
        } else {
            return (
                <div>
                    <h1>Error loading content.</h1>
                </div>
            );
        }
    }


}