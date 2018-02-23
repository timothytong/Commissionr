import React from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import geocoder from 'geocoder';

export default class PostsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.deletePost = this.deletePost.bind(this);
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

    deletePost(index) {
        const newPosts = this.state.posts.slice(0,index).concat(this.state.posts.slice(index+1));
        this.setState({posts: newPosts});
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
                    {
                        this.state.posts.map((post, index) => {
                            return geocoder.reverseGeocode( 33.7489, -84.3789, (err, data) => {
                                debugger
                                return (
                                    <li key={index}>
                                        {post.id}: looking for {post.name}
                                        <DeleteButton deletePost={this.deletePost} postId={post.id} postIndex={index}/>
                                        <ul>
                                            {post.additional_attributes.map((attr, index) => 
                                                <li key={index}>
                                                    {attr.key} => {attr.value}
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                );
                            });
                        })
                    }
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