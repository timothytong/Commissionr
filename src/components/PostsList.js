import React from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import googleMaps from '@google/maps';

export default class PostsList extends React.Component {

    constructor(props) {
        super(props);
        const googleMapsClient = googleMaps.createClient({
            key: 'AIzaSyCqdarCsFQeR7h6Kl643pyk6c8sXxlkHO0'
        });
        this.state = {
            loading: true,
            googleClient: googleMapsClient,
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
            const posts = response.data.data;
            posts.map((post) => {
                this.state.googleClient.reverseGeocode({
                    latlng: [post.latitude, post.longitude],
                }, (error, data) => {
                    if (error === null && data.json.results.length !== 0) {
                        post.formattedAddress = data.json.results[0].formatted_address;
                    } else {
                        const rawData = `Latitude (${post.latitude}), Longitude (${post.longitude})`;
                        post.formattedAddress = rawData;
                    }
                    this.forceUpdate();
                });
            });
            this.setState({loading: false, posts: posts});
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
                            return (
                                <li key={index}>
                                    {post.id}: looking for {post.name} around {post.formattedAddress}
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
